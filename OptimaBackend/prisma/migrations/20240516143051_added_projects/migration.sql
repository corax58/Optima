-- CreateTable
CREATE TABLE "Project" (
    "projectId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT,
    "hasDeadLine" BOOLEAN NOT NULL,
    "deadLine" TIMESTAMP(3),
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "ProjectMembers" (
    "projectProjectId" TEXT NOT NULL,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "ProjectMembers_pkey" PRIMARY KEY ("projectProjectId","userUserId")
);

-- CreateTable
CREATE TABLE "SubTask" (
    "subTaskId" SERIAL NOT NULL,
    "subTaskName" TEXT NOT NULL,
    "projectProjectId" TEXT NOT NULL,

    CONSTRAINT "SubTask_pkey" PRIMARY KEY ("subTaskId")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembers" ADD CONSTRAINT "ProjectMembers_projectProjectId_fkey" FOREIGN KEY ("projectProjectId") REFERENCES "Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembers" ADD CONSTRAINT "ProjectMembers_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_projectProjectId_fkey" FOREIGN KEY ("projectProjectId") REFERENCES "Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
