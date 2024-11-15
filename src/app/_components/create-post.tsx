"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { Button, Skeleton, Textarea } from "./ui";
import { api } from "@/trpc/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const MAX_TEXTAREA_LENGTH = 255;

const createPostFormSchema = z.object({
  postContent: z.string().max(MAX_TEXTAREA_LENGTH).min(5),
});

type PostFormSchema = z.infer<typeof createPostFormSchema>;

export default function CreatePost() {
  const { register, watch, handleSubmit, reset } = useForm({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      postContent: "",
    },
  });
  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
  });

  const postContent = watch("postContent");
  const postContentLength = postContent.length;

  function handleSubmitPostContent(data: PostFormSchema) {
    createPost.mutate({
      content: data.postContent,
    });
    reset();
    toast({
      title: "Post Created!",
      description: "Your post has been successfully created",
    });
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitPostContent)}>
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
          {postContentLength}/{MAX_TEXTAREA_LENGTH}
        </div>

        <Textarea
          disabled={createPost.isPending}
          className="border-grey-700 h-32 max-h-32 resize-none border py-4 pl-24 pr-4 font-medium"
          maxLength={MAX_TEXTAREA_LENGTH}
          autoFocus
          placeholder="What would you like to share?"
          {...register("postContent")}
        />
      </div>

      <Button
        className="ml-auto mt-4 flex w-full max-w-24 items-center gap-2 font-bold"
        type="submit"
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
    </form>
  );
}
