const express = require("express");
const router = express.Router();

const {
  getAllHabits,
  updateHabit,
  createHabit,
  getHabit,
  deleteHabit,
  getPublicHabits,
} = require("../controllers/habitsController");

//habits
router.post("/public", getPublicHabits);

router.get("/:userId/:habitId", getHabit);

router.get("/:userId", getAllHabits);

router.post("/:userId", createHabit);

router.patch("/:habitId", updateHabit);

router.delete("/:habitId", deleteHabit);

module.exports = router;
