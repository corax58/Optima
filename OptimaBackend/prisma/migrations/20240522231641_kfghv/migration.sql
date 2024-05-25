-- DropForeignKey
ALTER TABLE "AssignedSubtask" DROP CONSTRAINT "AssignedSubtask_projectMemberProjectMemberId_fkey";

-- DropForeignKey
ALTER TABLE "AssignedSubtask" DROP CONSTRAINT "AssignedSubtask_subTaskSubTaskId_fkey";

-- DropForeignKey
ALTER TABLE "ProjecctInvites" DROP CONSTRAINT "ProjecctInvites_projectProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_projectProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_userUserId_fkey";

-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_projectProjectId_fkey";

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_projectProjectId_fkey" FOREIGN KEY ("projectProjectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_projectProjectId_fkey" FOREIGN KEY ("projectProjectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedSubtask" ADD CONSTRAINT "AssignedSubtask_subTaskSubTaskId_fkey" FOREIGN KEY ("subTaskSubTaskId") REFERENCES "SubTask"("subTaskId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedSubtask" ADD CONSTRAINT "AssignedSubtask_projectMemberProjectMemberId_fkey" FOREIGN KEY ("projectMemberProjectMemberId") REFERENCES "ProjectMember"("projectMemberId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjecctInvites" ADD CONSTRAINT "ProjecctInvites_projectProjectId_fkey" FOREIGN KEY ("projectProjectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;
