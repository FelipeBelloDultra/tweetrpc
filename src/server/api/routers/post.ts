import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type Post } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string().max(255) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          content: input.content,
          authorId: ctx.userId,
        },
      });
    }),

  fetchAll: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input;
      const items = await ctx.db.post.findMany({
        take: limit + 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        skip,
        orderBy: [{ createdAt: "desc" }],
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }

      const posts = await addUserDataToPost(items);
      return {
        data: posts,
        nextCursor,
      };
    }),
});

async function addUserDataToPost(posts: Array<Post>) {
  const clerkClientInstance = await clerkClient();
  const authorsId = posts.map((post) => post.authorId);
  const accounts = await clerkClientInstance.users.getUserList({
    userId: authorsId,
    limit: 100,
  });

  return posts.map((post) => {
    const author = accounts.data.find(
      (account) => account.id === post.authorId,
    );

    if (!author) {
      console.error("AUTHOR NOT FOUND", post);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Author for post not found. POST ID: ${post.id}, AUTHOR ID: ${post.authorId}`,
      });
    }

    if (!author.firstName || !author.lastName) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Author has first name or last name. AUTHOR ID: ${author.id}`,
      });
    }

    return {
      post,
      author: {
        ...author,
        name: `${author.firstName} ${author.lastName}`,
      },
    };
  });
}
