import CreatePost from "../_components/create-post";
import { PostList } from "../_components/post-list";

export default async function HomePage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 pt-20">
      <CreatePost />

      <PostList />
    </main>
  );
}
