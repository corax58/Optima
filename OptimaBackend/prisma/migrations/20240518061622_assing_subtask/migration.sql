-- CreateTable
CREATE TABLE "AssignedSubtask" (
    "assignmentId" SERIAL NOT NULL,
    "subTaskSubTaskId" INTEGER NOT NULL,
    "projectMemberProjectMemberId" INTEGER NOT NULL,

    CONSTRAINT "AssignedSubtask_pkey" PRIMARY KEY ("assignmentId")
);

-- AddForeignKey
ALTER TABLE "AssignedSubtask" ADD CONSTRAINT "AssignedSubtask_subTaskSubTaskId_fkey" FOREIGN KEY ("subTaskSubTaskId") REFERENCES "SubTask"("subTaskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedSubtask" ADD CONSTRAINT "AssignedSubtask_projectMemberProjectMemberId_fkey" FOREIGN KEY ("projectMemberProjectMemberId") REFERENCES "ProjectMember"("projectMemberId") ON DELETE RESTRICT ON UPDATE CASCADE;
