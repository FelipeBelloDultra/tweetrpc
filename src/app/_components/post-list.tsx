"use client";

import { api } from "@/trpc/react";
import { EmptyList } from "./empty-list";
import { Post } from "./post";
import { Skeleton } from "./ui";

export function PostList() {
  const { data, isPending } = api.post.fetchAll.useQuery();

  if (isPending || !data) {
    return (
      <div className="mt-6 flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostLoader key={`${i}-post-loader`} />
        ))}
      </div>
    );
  }

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

function PostLoader() {
  return (
    <div className="flex items-start gap-2 rounded-md bg-white p-4">
      <Skeleton className="size-12 rounded-full" />

      <div className="flex h-11 flex-1 flex-col">
        <div className="mb-1 flex items-center justify-between">
          <Skeleton className="inline-block h-5 w-32" />

          <Skeleton className="inline-block h-5 w-24" />
        </div>

        <div className="mt-auto flex h-2 gap-1">
          <Skeleton className="inline-block h-full w-8" />
          <Skeleton className="inline-block h-full w-4" />
          <Skeleton className="inline-block h-full w-12" />
        </div>
      </div>
    </div>
  );
}
