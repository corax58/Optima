/*
  Warnings:

  - You are about to drop the column `visibility` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `VerificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ForgotPassword` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ForgotPassword" DROP CONSTRAINT "ForgotPassword_userUserId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "visibility";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "VerificationToken",
DROP COLUMN "email",
DROP COLUMN "emailVerified",
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "ForgotPassword";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
