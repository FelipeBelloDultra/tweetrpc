"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "@/trpc/react";
import { EmptyList } from "./empty-list";
import { Post } from "./post";
import { Skeleton } from "./ui";
import { Loader2 } from "lucide-react";

export function PostList() {
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } =
    api.post.fetchAll.useInfiniteQuery(
      {
        limit: 15,
      },
      {
        getNextPageParam: (lastPageParam) => lastPageParam.nextCursor,
      },
    );

  useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="mt-6 flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostLoader key={`${i}-post-loader`} />
        ))}
      </div>
    );
  }

  if (!data) {
    return <EmptyList />;
  }

  return (
    <div className="pb-40">
      <ul className="mt-6 flex flex-col gap-4">
        {data.pages.map((pages, i) =>
          pages.data.length > 0 ? (
            pages.data.map(({ post, author }) => (
              <Post
                key={post.id}
                authorImage={author.imageUrl}
                authorName={author.name}
                content={post.content}
                createdAt={post.createdAt}
              />
            ))
          ) : (
            <EmptyList key={`empty-list-${i}`} />
          ),
        )}

        {!!isFetchingNextPage && !!hasNextPage && (
          <div className="mt-4 flex w-full justify-center">
            <Loader2 size={50} className="animate-spin text-primary" />
          </div>
        )}
        <div ref={ref}> </div>
      </ul>
    </div>
  );
}

function PostLoader() {
  return (
    <div className="flex items-start gap-2 rounded-md bg-white p-4">
      <Skeleton className="size-12 rounded-full" />

      <div className="flex h-11 flex-1 flex-col">
        <div className="mb-1 flex flex-wrap items-center justify-between">
          <Skeleton className="inline-block h-5 w-32 flex-shrink-0" />

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
