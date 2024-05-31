require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./prisma/prismaClient");
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
const { sendNotification } = require("./controllers/subscribeController");

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

  //test routes
  app.get("/api/table", async (req, res) => {
    await prisma.user.deleteMany();
    res.send("sus");
  });
  app.get("/api/allusers", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });
  app.get("/api/clean", async (req, res) => {
    await prisma.user.deleteMany();
    res.json({ msg: "Cleaned everything" });
  });

  //catching unregistered routes
  app.all("*", (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  console.log(await prisma.notificationSubcription.findMany());
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
  // Parse the given timestamp
  const date = new Date(timestamp);

  // Add hours
  date.setHours(date.getHours() + hours);

  // Format the modified timestamp back to the desired format
  const modifiedTimestamp = date.toISOString();

  return modifiedTimestamp;
}

async function checkReminders() {
  // Given timestamp

  const time = new Date();
  const modtime = addHours(time, 3);
  const currentTime = modtime.slice(11, 16);

  // console.log(modtime.slice(11, 16));

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

cron.schedule("* * * * *", checkReminders);
// checkReminders();
