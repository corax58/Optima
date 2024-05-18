/*
  Warnings:

  - You are about to drop the column `projectId` on the `SubTask` table. All the data in the column will be lost.
  - You are about to drop the column `projectMemberId` on the `SubTask` table. All the data in the column will be lost.
  - You are about to drop the `ProjectMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectProjectId` to the `SubTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_projectProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_userUserId_fkey";

-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_projectId_fkey";

-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_projectMemberId_fkey";

-- AlterTable
ALTER TABLE "SubTask" DROP COLUMN "projectId",
DROP COLUMN "projectMemberId",
ADD COLUMN     "projectProjectId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProjectMember";

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_projectProjectId_fkey" FOREIGN KEY ("projectProjectId") REFERENCES "Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
