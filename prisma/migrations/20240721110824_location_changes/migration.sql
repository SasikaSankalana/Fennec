/*
  Warnings:

  - You are about to drop the column `latitude` on the `UserLocation` table. All the data in the column will be lost.
  - Added the required column `latidude` to the `UserLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserLocation" DROP COLUMN "latitude",
ADD COLUMN     "latidude" DOUBLE PRECISION NOT NULL;
