-- CreateTable
CREATE TABLE "NotificationSubcription" (
    "id" SERIAL NOT NULL,
    "subscription" JSONB NOT NULL,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "NotificationSubcription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationSubcription" ADD CONSTRAINT "NotificationSubcription_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
