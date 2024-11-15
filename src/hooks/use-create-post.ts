import { z } from "zod";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const MAX_TEXTAREA_LENGTH = 255;

const createPostFormSchema = z.object({
  postContent: z.string().max(MAX_TEXTAREA_LENGTH).min(5),
});
type PostFormSchema = z.infer<typeof createPostFormSchema>;

export function useCreatePost() {
  const maxTextareaLength = MAX_TEXTAREA_LENGTH;
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

  function handleSubmitForm() {
    return handleSubmit(handleSubmitPostContent);
  }

  return {
    handleSubmitForm,
    register,
    postContentLength,
    maxTextareaLength,
    isPending: createPost.isPending,
  };
}
