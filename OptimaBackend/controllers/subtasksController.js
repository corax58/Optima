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
  let { subtaskName } = req.body;

  console.log(subtaskName);

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
        projectProjectId: projectId,
        subTaskId: parseInt(subtaskId),
      },
      data: {
        subTaskName: subtaskName,
      },
    });

    res.status(200).json(subtask);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

//add assign a user to a subtask

//

module.exports = {
  getAllSubtasks,
  createSubtask,
  deleteSubtask,
  updateSubtask,
};
