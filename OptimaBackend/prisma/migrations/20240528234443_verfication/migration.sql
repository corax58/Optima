-- AlterTable
ALTER TABLE "User" ADD COLUMN     "VerificationToke" TEXT,
ADD COLUMN     "VerifiedEmail" BOOLEAN NOT NULL DEFAULT false;
