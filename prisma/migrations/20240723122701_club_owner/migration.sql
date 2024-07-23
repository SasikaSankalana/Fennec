/*
  Warnings:

  - You are about to drop the `club_owners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clubs" DROP CONSTRAINT "clubs_clubOwnerId_fkey";

-- DropTable
DROP TABLE "club_owners";

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_clubOwnerId_fkey" FOREIGN KEY ("clubOwnerId") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
