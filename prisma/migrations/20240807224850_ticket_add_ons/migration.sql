/*
  Warnings:

  - Added the required column `maxQuantity` to the `ticket_add_ons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket_add_ons" ADD COLUMN     "maxQuantity" INTEGER NOT NULL;
