/*
  Warnings:

  - You are about to drop the column `VerificationToke` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `VerifiedEmail` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "VerificationToke",
DROP COLUMN "VerifiedEmail",
ADD COLUMN     "VerificationToken" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;
