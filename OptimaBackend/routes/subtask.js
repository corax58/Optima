const express = require("express");
const {
  getAllSubtasks,
  createSubtask,
  deleteSubtask,
  updateSubtask,
} = require("../controllers/subtasksController");

const router = express.Router();

router.get("/:projectId", getAllSubtasks);

router.post("/:projectId", createSubtask);

router.delete("/:projectId/:subtaskId", deleteSubtask);

router.patch("/:projectId/:subtaskId", updateSubtask);

module.exports = router;
