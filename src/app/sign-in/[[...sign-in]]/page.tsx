import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <h1>test</h1>
      <SignIn signUpUrl="/sign-up" />
    </>
  );
}
