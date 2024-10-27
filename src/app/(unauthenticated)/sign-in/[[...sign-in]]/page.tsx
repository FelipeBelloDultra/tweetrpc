import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { SignLoaders } from "@/app/_components/sign-loaders";

export default function SignInPage() {
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
