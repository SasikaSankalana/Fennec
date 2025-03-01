-- CreateTable
CREATE TABLE "user_settings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupInvitations" BOOLEAN NOT NULL,
    "accountActivity" BOOLEAN NOT NULL,
    "updatesAndEnhancements" BOOLEAN NOT NULL,
    "enableNotifications" BOOLEAN NOT NULL,
    "enableSounds" BOOLEAN NOT NULL,
    "enableRewards" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
