/*
  Warnings:

  - Changed the type of `expiryDate` on the `payment_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "payment_details" DROP COLUMN "expiryDate",
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL;
