/*
  Warnings:

  - You are about to drop the column `outingFreequency` on the `onboardings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "onboardings" DROP COLUMN "outingFreequency",
ADD COLUMN     "outingFrequency" TEXT,
ALTER COLUMN "residence" DROP NOT NULL,
ALTER COLUMN "vancouverArea" DROP NOT NULL,
ALTER COLUMN "nightlifeType" DROP NOT NULL,
ALTER COLUMN "favouriteInstrument" DROP NOT NULL,
ALTER COLUMN "drinkOfChoice" DROP NOT NULL,
ALTER COLUMN "groupOrAlone" DROP NOT NULL,
ALTER COLUMN "arrivalTime" DROP NOT NULL,
ALTER COLUMN "appealingPromotion" DROP NOT NULL,
ALTER COLUMN "notificationPreference" DROP NOT NULL,
ALTER COLUMN "nighlifeEnvironment" DROP NOT NULL,
ALTER COLUMN "foodImportance" DROP NOT NULL,
ALTER COLUMN "drinkPreference" DROP NOT NULL,
ALTER COLUMN "reasonForNightlife" DROP NOT NULL;
