"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { Button, Skeleton, Textarea } from "./ui";
import { useCreatePost } from "@/hooks/use-create-post";

export default function CreatePost() {
  const {
    postContentLength,
    register,
    handleSubmitForm,
    maxTextareaLength,
    isPending,
    formState,
  } = useCreatePost();

  return (
    <form onSubmit={handleSubmitForm()}>
      <div className="relative">
        <div className="absolute left-4 top-2">
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
        </div>

        <div className="absolute bottom-0 left-0 py-2 pl-4 pr-2 text-sm font-bold">
          {postContentLength}/{maxTextareaLength}
        </div>

        <Textarea
          disabled={isPending}
          className="border-grey-700 h-32 max-h-32 resize-none border py-4 pl-24 pr-4 font-medium"
          maxLength={maxTextareaLength}
          autoFocus
          placeholder="What would you like to share?"
          {...register("postContent")}
        />
      </div>

      <Button
        className="ml-auto mt-4 flex w-full max-w-24 items-center gap-2 font-bold"
        type="submit"
        disabled={isPending || !formState.isValid}
      >
        {isPending ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <>
            Share <SendIcon />
          </>
        )}
      </Button>
    </form>
  );
}
