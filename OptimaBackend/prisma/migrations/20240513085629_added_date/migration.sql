/*
  Warnings:

  - The primary key for the `Habit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_userId_fkey";

-- DropForeignKey
ALTER TABLE "HabitEntry" DROP CONSTRAINT "HabitEntry_habitHabitId_fkey";

-- AlterTable
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_pkey",
ALTER COLUMN "habitId" DROP DEFAULT,
ALTER COLUMN "habitId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Habit_pkey" PRIMARY KEY ("habitId");
DROP SEQUENCE "Habit_habitId_seq";

-- AlterTable
ALTER TABLE "HabitEntry" ALTER COLUMN "habitHabitId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitEntry" ADD CONSTRAINT "HabitEntry_habitHabitId_fkey" FOREIGN KEY ("habitHabitId") REFERENCES "Habit"("habitId") ON DELETE RESTRICT ON UPDATE CASCADE;
