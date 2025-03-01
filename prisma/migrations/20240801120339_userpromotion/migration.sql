-- CreateTable
CREATE TABLE "user_promotion_events" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "clubNightId" TEXT NOT NULL,

    CONSTRAINT "user_promotion_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_promotion_events" ADD CONSTRAINT "user_promotion_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_promotion_events" ADD CONSTRAINT "user_promotion_events_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_promotion_events" ADD CONSTRAINT "user_promotion_events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_promotion_events" ADD CONSTRAINT "user_promotion_events_clubNightId_fkey" FOREIGN KEY ("clubNightId") REFERENCES "club_nights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
