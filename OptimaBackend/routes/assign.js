const express = require("express");
const {
  assignUser,
  removeFromSubtask,
} = require("../controllers/subtasksController");
const router = express.Router();

router.post("/", assignUser);

router.delete("/:subtaskId/:projectMemberId", removeFromSubtask);

module.exports = router;
