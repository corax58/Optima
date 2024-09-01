require("dotenv").config();

const express = require("express");
const cors = require("cors");
const newLocal_1 = "./prisma/prismaClient";
const prisma = require(newLocal_1);
const cron = require("node-cron");

//express app
const app = express();
const PORT = process.env.PORT;

//routers
const userRouter = require("./routes/user");
const habitRouter = require("./routes/habits");
const habitEntryRouter = require("./routes/habitEntry");
const projectRouter = require("./routes/projects");
const subtasRouter = require("./routes/subtask");
const memberRouter = require("./routes/member");
const assignRouter = require("./routes/assign");
const invitesRouter = require("./routes/invites");
const subscribeRouter = require("./routes/subscribe");
const newLocal = "./controllers/subscribeController";
const sendNotification = require(newLocal);

async function main() {
  //middlewares
  app.use(cors());
  app.use(express.json());
  // notification

  //registering api routes
  app.use("/api/subscribe", subscribeRouter);
  app.use("/api/user", userRouter);
  app.use("/api/habit", habitRouter);
  app.use("/api/habitEntry", habitEntryRouter);
  app.use("/api/project", projectRouter);
  app.use("/api/subtask", subtasRouter);
  app.use("/api/member", memberRouter);
  app.use("/api/assign", assignRouter);
  app.use("/api/invites", invitesRouter);

  //catching unregistered routes
  app.all("*", (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  //Listening for requrests
  app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//notifications

function addHours(timestamp, hours) {
  const date = new Date(timestamp);

  date.setHours(date.getHours() + hours);

  const modifiedTimestamp = date.toISOString();

  return modifiedTimestamp;
}

async function checkReminders() {
  // Given timestamp

  const time = new Date();
  const modtime = addHours(time, 3);
  const currentTime = modtime.slice(11, 16);

  const habits = await prisma.habit.findMany({
    where: {
      remindMe: true,
      remindTime: currentTime,
    },
    include: {
      user: {
        select: {
          userId: true,
        },
      },
    },
  });

  for (const habit of habits) {
    sendNotification({
      userId: habit.userId,
      message: `Time for ${habit.habitName}`,
    });
  }
}

const createMissingHabitEntries = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfToday = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const habits = await prisma.habit.findMany();

  for (const habit of habits) {
    const entriesToday = await prisma.habitEntry.findMany({
      where: {
        habitHabitId: habit.habitId,
        createdAt: {
          gte: today,
          lt: endOfToday,
        },
      },
    });

    if (entriesToday.length === 0) {
      await prisma.habitEntry.create({
        data: {
          quantity: 0,
          habitHabitId: habit.habitId,
        },
      });
    }
  }
};

// Cron jobs
cron.schedule("* * * * *", checkReminders);

cron.schedule(
  "59 23 * * *",
  () => {
    console.log("Running the cron job to create missing habit entries");
    createMissingHabitEntries().catch((error) => console.error(error));
  },
  {
    scheduled: true,
  }
);
