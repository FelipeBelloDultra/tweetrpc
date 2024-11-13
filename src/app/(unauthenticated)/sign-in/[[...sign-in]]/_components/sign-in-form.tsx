"use client";

import { LoaderCircleIcon, LogInIcon } from "lucide-react";
import { useSignIn } from "../_hooks/use-sign-in";
import { Button } from "@/app/_components/ui";
import { Form, FormField, FormItem } from "@/app/_components/ui/form";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { useSearchParams } from "next/navigation";

export function SignInForm() {
  const searchParams = useSearchParams();
  const searchParamsRedirectUrl = searchParams.get("redirect_url");
  const redirectUrl = searchParamsRedirectUrl ? searchParamsRedirectUrl : "/";
  const { form, isPending, onSubmitSignInForm } = useSignIn({
    redirectUrl,
  });

  return (
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

        <Button type="submit" disabled={isPending || !form.formState.isValid}>
          {isPending ? (
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
  );
}
