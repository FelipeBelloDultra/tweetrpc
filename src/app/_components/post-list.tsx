import { api } from "@/trpc/server";
import { EmptyList } from "./empty-list";
import { Post } from "./post";

export async function PostList() {
  const data = await api.post.fetchAll();

  console.log(data);

  return (
    <div className="pb-10">
      {!!data.length ? (
        <ul className="mt-6 flex flex-col gap-4">
          {data.map(({ post, author }) => (
            <Post
              key={post.id}
              authorImage={author.imageUrl}
              authorName={author.name}
              content={post.content}
              createdAt={post.createdAt}
            />
          ))}
        </ul>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}
