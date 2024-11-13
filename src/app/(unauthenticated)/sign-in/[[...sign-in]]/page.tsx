import { SignInForm } from "./_components/sign-in-form";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/app/_components/ui";

export default async function SignInPage() {
  const { userId } = await auth();

  if (userId) return redirect("/");

  return (
    <div className="flex items-start pt-20">
      <main className="mx-auto flex w-[25rem] max-w-[calc(-2.5rem+100vw)] flex-col gap-8 rounded-xl bg-white px-10 py-8 shadow-clerk">
        <header className="flex flex-col items-center gap-[0.25rem]">
          <h1 className="text-[1.0625rem] font-bold leading-[1.41176] text-[#212126]">
            Sign in to TweetRPC
          </h1>

          <p className="font-regular text-[0.8125rem] leading-[1.38462] text-[#747686]">
            Welcome back! Please sign in to continue
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <SignInForm />
        </section>

        <small className="text-muted-foreground">
          Don&apos;t have an account?
          <Button asChild variant="link" className="px-2 text-xs">
            <SignUpButton>Sign Up</SignUpButton>
          </Button>
        </small>
      </main>
    </div>
  );
}
