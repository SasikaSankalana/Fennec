/*
  Warnings:

  - Added the required column `paymentMethod` to the `payment_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_details" ADD COLUMN     "paymentMethod" TEXT NOT NULL;
