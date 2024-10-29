/*
  Warnings:

  - You are about to drop the column `account_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `external_clerk_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_account_id_fkey";

-- DropIndex
DROP INDEX "posts_account_id_idx";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "account_id",
ADD COLUMN     "external_clerk_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "accounts";

-- CreateIndex
CREATE INDEX "posts_external_clerk_id_idx" ON "posts"("external_clerk_id");
