const express = require("express");
const router = express.Router();

const {
  addHabitEntry,
  getAllHabitEntry,
} = require("../controllers/habitsController");

//habit entries

router.get("/:habitId", getAllHabitEntry);

router.post("/:habitId", addHabitEntry);

module.exports = router;
