/*
  Warnings:

  - The values [ACCEPTED,REJECTED] on the enum `FriendRequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendRequestStatus_new" AS ENUM ('PENDING');
ALTER TYPE "FriendRequestStatus" RENAME TO "FriendRequestStatus_old";
ALTER TYPE "FriendRequestStatus_new" RENAME TO "FriendRequestStatus";
DROP TYPE "FriendRequestStatus_old";
COMMIT;

-- CreateTable
CREATE TABLE "friends" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
