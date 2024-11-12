import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { SignLoaders } from "@/app/_components/sign-loaders";
import { SignInForm } from "./_components/sign-in-form";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: {
    redirect_url: string;
  };
}) {
  const { redirect_url: redirectUrl } = searchParams;
  const { userId } = await auth();

  if (userId) return redirect("/");

  return (
    <div className="flex items-start pt-20">
      <ClerkLoading>
        <SignLoaders.Root
          header={
            <SignLoaders.Header
              title="Sign in to TweetRPC"
              description="Welcome back! Please sign in to continue"
            />
          }
          main={<SignLoaders.Main />}
        />
      </ClerkLoading>

      <SignInForm redirectUrl={redirectUrl} />
      <ClerkLoaded>
        <SignIn
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              rootBox: "mx-auto",
            },
          }}
        />
      </ClerkLoaded>
    </div>
  );
}
