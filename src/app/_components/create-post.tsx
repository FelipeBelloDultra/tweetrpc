"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { Button, Skeleton, Textarea } from "./ui";
import { useState } from "react";
import { api } from "@/trpc/react";

const MAX_TEXTAREA_LENGTH = 255;

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setPostContent("");
    },
  });

  function onChangePost(content: string) {
    if (content.length > MAX_TEXTAREA_LENGTH) return;

    setPostContent(content);
  }

  function handleSubmitPost() {
    if (postContent.trim().length === 0) return;

    createPost.mutate({
      content: postContent,
    });
  }

  return (
    <>
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
          {postContent.length}/{MAX_TEXTAREA_LENGTH}
        </div>

        <Textarea
          disabled={createPost.isPending}
          className="border-grey-700 h-32 max-h-32 resize-none border py-4 pl-24 pr-4 font-medium"
          maxLength={MAX_TEXTAREA_LENGTH}
          autoFocus
          placeholder="What would you like to share?"
          value={postContent}
          onChange={(e) => onChangePost(e.target.value)}
        />
      </div>

      <Button
        className="ml-auto mt-4 flex w-full max-w-24 items-center gap-2 font-bold"
        onClick={handleSubmitPost}
        disabled={createPost.isPending}
      >
        {createPost.isPending ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <>
            Share <SendIcon />
          </>
        )}
      </Button>
    </>
  );
}
