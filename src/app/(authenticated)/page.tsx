import CreatePost from "../_components/create-post";
import { EmptyList } from "../_components/empty-list";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 pt-20">
      <CreatePost />

      <section>
        <EmptyList />
      </section>
    </main>
  );
}
