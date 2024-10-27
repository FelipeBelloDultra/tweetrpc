/*
  Warnings:

  - You are about to drop the column `external_clerk_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `posts` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "posts_external_clerk_id_idx";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "external_clerk_id",
DROP COLUMN "updated_at",
ADD COLUMN     "account_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "accounts" (
    "external_clerk_id" TEXT NOT NULL,
    "external_clerk_email" TEXT NOT NULL,
    "external_clerk_first_name" TEXT NOT NULL,
    "external_clerk_last_name" TEXT NOT NULL,
    "external_clerk_image_url" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("external_clerk_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_external_clerk_email_key" ON "accounts"("external_clerk_email");

-- CreateIndex
CREATE INDEX "posts_account_id_idx" ON "posts"("account_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("external_clerk_id") ON DELETE CASCADE ON UPDATE CASCADE;
