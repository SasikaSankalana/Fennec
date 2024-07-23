/*
  Warnings:

  - Added the required column `clubOwnerId` to the `clubs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "clubs" ADD COLUMN     "clubOwnerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_accounts" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "club_owners" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "telephoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "club_owners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_clubOwnerId_fkey" FOREIGN KEY ("clubOwnerId") REFERENCES "club_owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
