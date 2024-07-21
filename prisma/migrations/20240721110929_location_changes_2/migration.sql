/*
  Warnings:

  - You are about to drop the column `latidude` on the `UserLocation` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `UserLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserLocation" DROP COLUMN "latidude",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL;
