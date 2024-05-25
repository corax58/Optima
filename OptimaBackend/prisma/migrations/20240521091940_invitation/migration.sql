-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "SubTask" ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "ProjecctInvites" (
    "id" SERIAL NOT NULL,
    "projectProjectId" TEXT NOT NULL,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "ProjecctInvites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjecctInvites" ADD CONSTRAINT "ProjecctInvites_projectProjectId_fkey" FOREIGN KEY ("projectProjectId") REFERENCES "Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjecctInvites" ADD CONSTRAINT "ProjecctInvites_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
