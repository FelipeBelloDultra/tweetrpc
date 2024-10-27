import { SignLoaders } from "@/app/_components/sign-loaders";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-start pt-20">
      <ClerkLoading>
        <SignLoaders.Root
          header={
            <SignLoaders.Header
              title="Create your account"
              description="Welcome! Please fill in the details to get started."
            />
          }
          main={<SignLoaders.Main showFullForm />}
        />
      </ClerkLoading>

      <ClerkLoaded>
        <SignUp
          signInUrl="/sign-in"
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
