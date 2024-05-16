const prisma = require("../prisma/prismaClient");

// get all Projecs of a user
const getAllProjects = async (req, res) => {
  const { userId } = req.params;

  //   try {
  //     habits = await prisma.habit.findMany({
  //       where: {
  //         userId: userId,
  //       },
  //     });

  //     res.status(200).json(habits);
  //   } catch (e) {
  //     console.log(e);
  //     res.status(404).json(e);
  //   }
};

//get a Project
const getProject = async (req, res) => {
  const { userId, projectId } = req.params;
  //   try {
  //     const habit = await prisma.habit.findFirst({
  //       where: {
  //         habitId: habitId,
  //         userId: userId,
  //       },
  //     });

  //     if (!habit) {
  //       console.log("hey there");
  //       throw Error("habit not found");
  //     }
  //     res.status(200).json(habit);
  //   } catch (e) {
  //     console.log(e);
  //     res.status(404).json({ error: e.message });
  //   }
};

// create a new project
const createProject = async (req, res) => {
  const { userId } = req.params;
  //   const {
  //     habitName,
  //     habitDescription,
  //     unit,
  //     remindMe,
  //     remindTime,
  //     quantifiable,
  //   } = req.body;

  //   const time = new Date(`2024-11-11T${remindTime}:00Z`);

  //   try {
  //     const habit = await prisma.habit.create({
  //       data: {
  //         habitName,

  //         description: habitDescription,
  //         unit,
  //         remindMe,
  //         quantifiable,
  //         userId: userId,
  //         remindTime: time,
  //       },
  //     });

  //     res.status(200).json(habit);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(404).json({ error: "error" });
  //   }
};

// update a project
const updateProject = async (req, res) => {
  const { projectId } = req.params;
  //   const { habitName, description, unit, remindMe } = req.body;

  //   try {
  //     if (!habitId) {
  //       throw Error("no user");
  //     }

  //     const habitExists = await prisma.habit.findFirst({
  //       where: {
  //         habitId: habitId,
  //       },
  //     });

  //     if (!habitExists) {
  //       throw Error("No habit with that id");
  //     }

  //     if (!habitName) {
  //       habitName = habitExists.habitName;
  //     }
  //     if (!description) {
  //       habitName = habitExists.description;
  //     }
  //     if (!unit) {
  //       habitName = habitExists.unit;
  //     }
  //     if (!remindMe) {
  //       habitName = habitExists.remindMe;
  //     }

  //     const habit = await prisma.habit.update({
  //       where: {
  //         habitId: habitId,
  //       },
  //       data: {
  //         habitName,
  //         description,
  //         unit,
  //         remindMe,
  //       },
  //     });

  //     res.status(200).json(habit);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(404).json({ error: err.message });
  //   }
};

// delete a Project
const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  //   try {
  //     const habitExist = await prisma.habit.findFirst({
  //       where: {
  //         habitId: habitId,
  //       },
  //     });

  //     if (!habitExist) {
  //       throw Error("habit not found");
  //     }

  //     const habit = await prisma.habit.delete({
  //       where: {
  //         habitId: habitId,
  //       },
  //     });

  //     res.status(200).json(habit);
  //   } catch (e) {
  //     console.log(e);

  //     res.status(404).json({ error: e.message });
  //   }
};

// // add a habit entry
// const addHabitEntry = async (req, res) => {
//   const { quantity } = req.body;
//   const { habitId } = req.params;
//   try {
//     const habitExists = await prisma.habit.findFirst({
//       where: {
//         habitId: habitId,
//       },
//     });

//     if (!habitExists) {
//       throw Error("habit does not exist");
//     }

//     const habitEntry = await prisma.habitEntry.create({
//       data: {
//         quantity,
//         habitHabitId: habitId,
//       },
//     });

//     res.status(200).json(habitEntry);
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({ error: err.message });
//   }
// };

// // get all habit entry of a habit
// const getAllHabitEntry = async (req, res) => {
//   const { habitId } = req.params;
//   try {
//     const habitExists = await prisma.habit.findFirst({
//       where: {
//         habitId: habitId,
//       },
//     });

//     if (!habitExists) {
//       throw Error("habit does not exist");
//     }
//     const habitEntries = await prisma.habitEntry.findMany({
//       where: {
//         habitHabitId: habitId,
//       },
//     });

//     res.status(200).json(habitEntries);
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({ error: err.message });
//   }
// };

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  //   addHabitEntry,
  //   getAllHabitEntry,
};
