"use client";

import { ClerkLoaded, ClerkLoading, UserButton, useAuth } from "@clerk/nextjs";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { Button, Skeleton, Textarea } from "./ui";
import { useState } from "react";
import { api } from "@/trpc/react";

const MAX_TEXTAREA_LENGTH = 255;

export default function CreatePost() {
  const [post, setPost] = useState("");
  const utils = api.useUtils();
  const { userId, signOut } = useAuth();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setPost("");
    },
  });

  function onChangePost(post: string) {
    if (post.length > MAX_TEXTAREA_LENGTH) return;

    setPost(post);
  }

  async function handleSubmitPost() {
    if (!userId) {
      await signOut();

      return;
    }

    createPost.mutate({
      authorId: userId,
      content: post,
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
          {post.length}/{MAX_TEXTAREA_LENGTH}
        </div>

        <Textarea
          disabled={createPost.isPending}
          className="border-grey-700 h-32 max-h-32 resize-none border py-4 pl-24 pr-4 font-medium"
          maxLength={MAX_TEXTAREA_LENGTH}
          autoFocus
          placeholder="What would you like to share?"
          value={post}
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
