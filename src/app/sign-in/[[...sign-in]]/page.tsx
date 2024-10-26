import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          rootBox: "mx-auto pt-20",
        },
      }}
    />
  );
}
