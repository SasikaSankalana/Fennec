/*
  Warnings:

  - Added the required column `city` to the `club_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "club_locations" ADD COLUMN     "city" TEXT NOT NULL;
