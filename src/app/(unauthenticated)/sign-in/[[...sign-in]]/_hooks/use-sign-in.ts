import { useSignIn as useClerkSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "@/hooks/use-toast";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type UseSignInProps = {
  redirectUrl: string;
};

type SignInSchema = z.infer<typeof signInSchema>;

export function useSignIn({ redirectUrl }: UseSignInProps) {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useClerkSignIn();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async ({ email, password }: SignInSchema) => {
      if (!isLoaded) return;

      const completeSignIn = await signIn.create({
        identifier: email,
        password,
        redirectUrl,
      });

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
      }

      return completeSignIn;
    },
    onSuccess: async (data) => {
      const userData = data?.userData;

      toast({
        title: `Welcome ${userData?.firstName}!`,
        description: "You have successfully signed in",
      });
      await router.push(redirectUrl || "/dashboard");
    },
    onError: async (error) => {
      if (error.message === "Session already exists") {
        await router.push(redirectUrl || "/dashboard");
      }
      console.error("Error authenticating", error);
      toast({
        title: "An error ocurred while signing in",
        description: "Try again later",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: SignInSchema) {
    await mutateAsync(values);
    form.reset();
  }

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
}
