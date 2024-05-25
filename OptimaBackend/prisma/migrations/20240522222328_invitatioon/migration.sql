/*
  Warnings:

  - Added the required column `state` to the `ProjecctInvites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjecctInvites" ADD COLUMN     "state" TEXT NOT NULL;
