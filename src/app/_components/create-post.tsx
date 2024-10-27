import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

export default function CreatePost() {
  return (
    <div>
      <ClerkLoading>
        <Skeleton className="size-16 rounded-full" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-16",
            },
          }}
        />
      </ClerkLoaded>
      Create a new post here.
      <form className="size-16">
        <input type="text" placeholder="Tweet text" />
        <button type="submit">Tweet</button>
      </form>
    </div>
  );
}
