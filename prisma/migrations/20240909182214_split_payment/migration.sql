/*
  Warnings:

  - The values [BYPERCENTAGE] on the enum `splitType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paymentType` on the `split_payments` table. All the data in the column will be lost.
  - Added the required column `splitPaymentType` to the `split_payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "splitpaymentType" AS ENUM ('GROUP', 'FRIENDS');

-- AlterEnum
BEGIN;
CREATE TYPE "splitType_new" AS ENUM ('EQUALLY', 'UNEQUALLY');
ALTER TABLE "split_payments" ALTER COLUMN "splitType" TYPE "splitType_new" USING ("splitType"::text::"splitType_new");
ALTER TYPE "splitType" RENAME TO "splitType_old";
ALTER TYPE "splitType_new" RENAME TO "splitType";
DROP TYPE "splitType_old";
COMMIT;

-- AlterTable
ALTER TABLE "split_payments" DROP COLUMN "paymentType",
ADD COLUMN     "splitPaymentType" "splitpaymentType" NOT NULL;
