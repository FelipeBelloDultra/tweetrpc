import { SignedIn, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
