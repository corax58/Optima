const prisma = require("../prisma/prismaClient");

//get all subtasks
const getAllSubtasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const subtasks = await prisma.subTask.findMany({
      where: {
        projectProjectId: projectId,
      },
    });

    res.status(200).json(subtasks);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

//create a subtask
const createSubtask = async (req, res) => {
  const { projectId } = req.params;

  const { subtaskName } = req.body;

  try {
    const projectExist = await prisma.project.findFirst({
      where: {
        projectId,
      },
    });

    if (!projectExist) {
      throw Error("Projects doesnt exist");
    }

    const subtask = await prisma.subTask.create({
      data: {
        subTaskName: subtaskName,
        projectProjectId: projectId,
        status: "New",
      },
    });

    res.status(200).json(subtask);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

//delete a subtask
const deleteSubtask = async (req, res) => {
  console.log("stuuf");
  const { projectId, subtaskId } = req.params;
  try {
    const subtaskExist = await prisma.subTask.findFirst({
      where: {
        projectProjectId: projectId,
        subTaskId: parseInt(subtaskId),
      },
    });

    if (!subtaskExist) {
      throw Error("Subtask doesnt exist");
    }

    const subtask = await prisma.subTask.delete({
      where: {
        projectProjectId: projectId,
        subTaskId: parseInt(subtaskId),
      },
    });

    res.status(200).json(subtask);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};
//update a subtask
const updateSubtask = async (req, res) => {
  const { projectId, subtaskId } = req.params;
  const { status } = req.body;

  try {
    const subtaskExist = await prisma.subTask.findFirst({
      where: {
        projectProjectId: projectId,
        subTaskId: parseInt(subtaskId),
      },
    });

    if (!subtaskExist) {
      throw Error("Subtask doesnt exist");
    }

    const subtask = await prisma.subTask.update({
      where: {
        subTaskId: subtaskExist.subTaskId,
      },
      data: {
        status: status,
      },
    });

    res.status(200).json(subtask);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

// assign a user to a subtask
const assignUser = async (req, res) => {
  const { projectMemberId, subtaskId } = req.body;
  console.log(projectMemberId, subtaskId);
  try {
    const memberId = parseInt(projectMemberId);
    const subtask = parseInt(subtaskId);

    const projectmemberExist = await prisma.projectMember.findFirst({
      where: {
        projectMemberId: memberId,
      },
    });
    if (!projectmemberExist) {
      throw Error("this user inst member of the project");
    }
    const subtaskExist = await prisma.subTask.findFirst({
      where: {
        subTaskId: subtask,
      },
    });
    if (!subtaskExist) {
      throw Error("the subtask doesnt exist");
    }

    const alreadyAssigned = await prisma.assignedSubtask.findFirst({
      where: {
        projectMemberProjectMemberId: memberId,
        subTaskSubTaskId: subtask,
      },
    });
    if (alreadyAssigned) {
      throw Error("this user is already assigned to this subtask");
    }

    const assing = await prisma.assignedSubtask.create({
      data: {
        projectMemberProjectMemberId: memberId,
        subTaskSubTaskId: subtask,
      },
    });

    res.status(200).json(assing);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

const removeFromSubtask = async (req, res) => {
  const { projectMemberId, subtaskId } = req.params;

  console.log(projectMemberId, subtaskId);
  try {
    const memberId = parseInt(projectMemberId);
    const subtask = parseInt(subtaskId);
    const assignedUser = await prisma.assignedSubtask.findFirst({
      where: {
        projectMemberProjectMemberId: memberId,
        subTaskSubTaskId: subtask,
      },
    });
    if (!assignedUser) {
      throw Error("the user isnt assinged to this subtask");
    }

    const assing = await prisma.assignedSubtask.delete({
      where: {
        assignmentId: assignedUser.assignmentId,
      },
    });

    res.status(200).json(assing);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};
//

module.exports = {
  getAllSubtasks,
  createSubtask,
  deleteSubtask,
  updateSubtask,
  assignUser,
  removeFromSubtask,
};
