/*
  Warnings:

  - You are about to drop the column `projectProjectId` on the `SubTask` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `SubTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_projectProjectId_fkey";

-- AlterTable
ALTER TABLE "SubTask" DROP COLUMN "projectProjectId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
