/*
  Warnings:

  - Added the required column `pointsRequired` to the `promotions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "pointsRequired" INTEGER NOT NULL;
