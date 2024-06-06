/*
  Warnings:

  - Added the required column `visibility` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "visibility" TEXT NOT NULL;
