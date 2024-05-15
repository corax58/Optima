/*
  Warnings:

  - Added the required column `quantifiable` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "quantifiable" BOOLEAN NOT NULL;
