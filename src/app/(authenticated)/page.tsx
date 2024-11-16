import CreatePost from "../_components/create-post";
import { PostList } from "../_components/post-list";
import { api } from "@/trpc/server";

export default function HomePage() {
  void api.post.fetchAll.prefetch();

  return (
    <main className="mx-auto w-full max-w-xl px-6 pt-20">
      <CreatePost />

      <PostList />
    </main>
  );
}
