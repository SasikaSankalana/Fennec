/*
  Warnings:

  - Added the required column `photoUrl` to the `club_nights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoUrl` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoUrl` to the `promotions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "club_nights" ADD COLUMN     "photoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "photoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "photoUrl" TEXT NOT NULL;
