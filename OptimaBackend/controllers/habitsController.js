const prisma = require("../prisma/prismaClient");

// get all habits of a user
const getAllHabits = async (req, res) => {
  const { userId } = req.params;

  try {
    habits = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json(habits);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

//get a habit
const getHabit = async (req, res) => {
  const { userId, habitId } = req.params;
  try {
    const habit = await prisma.habit.findFirst({
      where: {
        habitId: habitId,
        userId: userId,
      },
    });

    if (!habit) {
      console.log("hey there");
      throw Error("habit not found");
    }
    res.status(200).json(habit);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

function subtractHours(timestamp, hours) {
  // Parse the given timestamp
  const date = new Date(timestamp);

  // Subtract hours
  date.setHours(date.getHours() - hours);

  // Format the modified timestamp back to the desired format
  const modifiedTimestamp = date.toISOString();

  return modifiedTimestamp;
}

// create a new habit
const createHabit = async (req, res) => {
  const { userId } = req.params;
  const {
    habitName,
    habitDescription,
    unit,
    remindMe,
    remindTime,
    quantifiable,
  } = req.body;

  try {
    const habit = await prisma.habit.create({
      data: {
        habitName,

        description: habitDescription,
        unit,
        remindMe,
        quantifiable,
        userId: userId,
        remindTime: remindTime,
      },
    });

    res.status(200).json(habit);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "error" });
  }
};

// update a habit
const updateHabit = async (req, res) => {
  const { habitId } = req.params;
  let { habitName, description, unit, remindMe, quantifiable } = req.body;

  console.log(description);
  try {
    // if (!habitId) {
    //   throw Error("no user");
    // }

    const habitExists = await prisma.habit.findFirst({
      where: {
        habitId: habitId,
      },
    });

    if (!habitExists) {
      throw Error("No habit with that id");
    }

    const habit = await prisma.habit.update({
      where: {
        habitId: habitId,
      },
      data: {
        habitName,
        description,
        unit,
        remindMe,
        quantifiable,
      },
    });

    console.table(habit);

    res.status(200).json(habit);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

// delete a habit
const deleteHabit = async (req, res) => {
  const { habitId } = req.params;

  try {
    const habitExist = await prisma.habit.findFirst({
      where: {
        habitId: habitId,
      },
    });

    if (!habitExist) {
      throw Error("habit not found");
    }

    await prisma.habitEntry.deleteMany({
      where: {
        habitHabitId: habitId,
      },
    });
    const habit = await prisma.habit.delete({
      where: {
        habitId: habitId,
      },
    });

    res.status(200).json(habit);
  } catch (e) {
    console.log(e);

    res.status(404).json({ error: e.message });
  }
};

// add a habit entry
const addHabitEntry = async (req, res) => {
  const { quantity } = req.body;
  const { habitId } = req.params;
  try {
    const habitExists = await prisma.habit.findFirst({
      where: {
        habitId: habitId,
      },
    });

    if (!habitExists) {
      throw Error("habit does not exist");
    }
    let habitEntry;
    if (habitExists.quantifiable) {
      habitEntry = await prisma.habitEntry.create({
        data: {
          quantity: parseFloat(quantity),
          habitHabitId: habitId,
        },
      });
    } else {
      habitEntry = await prisma.habitEntry.create({
        data: {
          quantity: 1,
          habitHabitId: habitId,
        },
      });
    }

    res.status(200).json(habitEntry);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

// get all habit entry of a habit
const getAllHabitEntry = async (req, res) => {
  const { habitId } = req.params;
  try {
    const habitExists = await prisma.habit.findFirst({
      where: {
        habitId: habitId,
      },
    });

    if (!habitExists) {
      throw Error("habit does not exist");
    }
    const habitEntries = await prisma.habitEntry.findMany({
      where: {
        habitHabitId: habitId,
      },
    });

    res.status(200).json(habitEntries);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getAllHabits,
  createHabit,
  updateHabit,
  getHabit,
  deleteHabit,
  addHabitEntry,
  getAllHabitEntry,
};
