const prisma = require("../prisma/prismaClient");

const { sendNotification } = require("./subscribeController");

// get projects
const getReport = async (req, res) => {
  const { userId } = req.params;
  try {
    const projects = await prisma.project.findMany({
      where: {
        adminId: userId,
        hasDeadLine: true,
      },
    });

    res.status(200).json(projects);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};
// get all Projecs of a user

const getAllProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    myProjects = await prisma.project.findMany({
      where: {
        adminId: userId,
      },
    });
    memberOf = await prisma.projectMember.findMany({
      where: {
        userUserId: userId,
        project: {
          adminId: { not: userId },
        },
      },
      select: {
        project: true,
      },
    });

    res.status(200).json({ myProjects, memberOf });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

//get a Project
const getProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await prisma.project.findFirst({
      where: {
        projectId: projectId,
      },
      include: {
        ProjectMember: {
          include: {
            member: true,
          },
        },
        admin: true,
        SubTask: {
          include: {
            AssignedSubtask: {
              include: {
                member: {
                  include: {
                    member: {
                      select: {
                        email: true,
                        userId: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw Error("Project not found");
    }
    res.status(200).json(project);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

// create a new project
const createProject = async (req, res) => {
  const { userId } = req.params;

  console.log(new Date());
  let { projectName, projectDescription, hasDeadLine, deadLine, startDate } =
    req.body;
  console.log("creating project");

  if (deadLine == "") {
    deadLine = null;
  }
  if (startDate == "") {
    startDate = new Date();
  }

  try {
    if (hasDeadLine && deadLine < startDate) {
      throw Error("the deadline should be after  the start date");
    }
    const project = await prisma.project.create({
      data: {
        projectName,
        description: projectDescription,
        hasDeadLine,
        adminId: userId,
        deadLine,
        startDate,
      },
    });
    const added = await prisma.projectMember.create({
      data: {
        userUserId: userId,
        projectProjectId: project.projectId,
      },
    });
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

// update a project
const updateProject = async (req, res) => {
  console.log("update started");
  const { projectId } = req.params;
  //   const { habitName, description, unit, remindMe } = req.body;
  let { projectName, projectDescription, deadLine, startDate } = req.body;

  console.log({ projectName, projectDescription, deadLine, startDate });

  try {
    const projectExists = await prisma.project.findFirst({
      where: {
        projectId: projectId,
      },
    });

    if (!projectExists) {
      throw Error("No projects found");
    }

    if (startDate < deadLine) {
      throw Error("Dead line should be after the start date");
    }
    if (deadLine == "") {
      deadLine = null;
    }
    const project = await prisma.project.update({
      where: {
        projectId: projectId,
      },
      data: {
        projectName,
        description: projectDescription,
        deadLine,
        startDate,
      },
    });
    console.log(project);
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

// delete a Project
const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const projectExist = await prisma.project.findFirst({
      where: {
        projectId,
      },
    });

    if (!projectExist) {
      throw Error("Project not found");
    }

    const project = await prisma.project.delete({
      where: {
        projectId,
      },
    });

    res.status(200).json(project);
  } catch (e) {
    console.log(e.message);

    res.status(404).json({ error: e.message });
  }
};

// get project members

const getMembers = async (req, res) => {
  const { projectId } = req.params;

  try {
    const member = await prisma.projectMember.findMany({
      where: {
        projectProjectId: projectId,
      },
    });
    res.status(200).json(member);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

// add a user to a project

const addUser = async (req, res) => {
  const { projectId } = req.params;
  const { userEmail } = req.body;
  console.log(userEmail);
  try {
    const projectExist = await prisma.project.findFirst({
      where: {
        projectId: projectId,
      },
    });
    if (!projectExist) {
      throw Error("Project doesnt exist");
    }
    const user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      throw Error("there is no user with that email");
    }
    const alreadyMember = await prisma.projectMember.findFirst({
      where: {
        userUserId: user.userId,
        projectProjectId: projectId,
      },
    });

    if (alreadyMember) {
      throw Error("this user is already a member of this  project");
    }

    const alreadInvited = await prisma.projecctInvites.findFirst({
      where: {
        projectProjectId: projectId,
        userUserId: user.userId,
        state: "waiting",
      },
    });

    if (alreadInvited) {
      throw Error("You already sent invitation to this user");
    }

    const invite = await prisma.projecctInvites.create({
      data: {
        projectProjectId: projectId,
        userUserId: user.userId,
        state: "waiting",
      },
    });

    await sendNotification({
      userId: user.userId,
      message: "You have new invite to a project",
    });

    res.status(200).json({ message: "Invitation sent" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

// remove user from a project

const removeUser = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const memberExist = await prisma.projectMember.findFirst({
      where: {
        projectProjectId: projectId,
        userUserId: userId,
      },
    });
    if (!memberExist) {
      throw Error("Member doesnt exist");
    }
    const member = await prisma.projectMember.delete({
      where: {
        projectMemberId: memberExist.projectMemberId,
        projectProjectId: projectId,
        userUserId: userId,
      },
    });
    res.status(200).json(member);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  addUser,
  removeUser,
  getMembers,
  getReport,
};
