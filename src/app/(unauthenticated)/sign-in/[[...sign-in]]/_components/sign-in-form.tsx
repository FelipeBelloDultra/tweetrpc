"use client";

import { LoaderCircleIcon, LogInIcon } from "lucide-react";
import { useSignIn } from "../_hooks/use-sign-in";
import { Button, Skeleton } from "@/app/_components/ui";
import { Form, FormField, FormItem } from "@/app/_components/ui/form";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";

interface SignInFormProps {
  redirectUrl: string;
}

export function SignInForm({ redirectUrl }: SignInFormProps) {
  const { form, isPending, isSuccess, onSubmitSignInForm } = useSignIn({
    redirectUrl,
  });

  const shouldShowLoader = isPending;

  return (
    <main className="mx-auto flex w-[25rem] max-w-[calc(-2.5rem+100vw)] flex-col gap-8 rounded-xl bg-white px-10 py-8 shadow-clerk">
      {/* {header} */}
      <header className="flex flex-col items-center gap-[0.25rem]">
        <h1 className="text-[1.0625rem] font-bold leading-[1.41176] text-[#212126]">
          Sign in to TweetRPC
        </h1>

        <p className="font-regular text-[0.8125rem] leading-[1.38462] text-[#747686]">
          Welcome back! Please sign in to continue
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <Skeleton className="h-[1.88rem] rounded-[0.375rem]" />

        <div className="flex items-center justify-center">
          <div className="h-[1px] flex-1 bg-[#00000011]"></div>
          <p className="mx-4 text-[0.8125rem] text-[#747686]">or</p>
          <div className="h-[1px] flex-1 bg-[#00000011]"></div>
        </div>

        <Form {...form}>
          <form
            className="flex flex-col gap-8"
            onSubmit={form.handleSubmit(onSubmitSignInForm)}
          >
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...field}
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...field}
                      id="password"
                      placeholder="**********"
                      type="password"
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending || !form.formState.isValid}
            >
              {shouldShowLoader ? (
                <>
                  <LoaderCircleIcon className="animate-spin" />
                  Signing In
                </>
              ) : (
                <>
                  <LogInIcon />
                  SignIn
                </>
              )}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
