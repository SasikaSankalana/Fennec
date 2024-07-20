-- CreateTable
CREATE TABLE "onboardings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "residence" TEXT NOT NULL,
    "vancouverArea" TEXT NOT NULL,
    "nightlifeType" TEXT NOT NULL,
    "outingFreequency" TEXT NOT NULL,
    "favouriteInstrument" TEXT NOT NULL,
    "drinkOfChoice" TEXT NOT NULL,
    "groupOrAlone" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "appealingPromotion" TEXT NOT NULL,
    "notificationPreference" TEXT NOT NULL,
    "nighlifeEnvironment" TEXT NOT NULL,
    "foodImportance" TEXT NOT NULL,
    "drinkPreference" TEXT NOT NULL,
    "reasonForNightlife" TEXT NOT NULL,
    "userAccountId" TEXT NOT NULL,

    CONSTRAINT "onboardings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "onboardings" ADD CONSTRAINT "onboardings_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
