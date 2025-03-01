/*
  Warnings:

  - Added the required column `clubId` to the `terms_and_conditions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "terms_and_conditions" ADD COLUMN     "clubId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "terms_and_conditions" ADD CONSTRAINT "terms_and_conditions_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
