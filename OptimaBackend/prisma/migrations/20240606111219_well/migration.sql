-- DropForeignKey
ALTER TABLE "ForgotPassword" DROP CONSTRAINT "ForgotPassword_userUserId_fkey";

-- AddForeignKey
ALTER TABLE "ForgotPassword" ADD CONSTRAINT "ForgotPassword_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
