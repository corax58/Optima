const express = require("express");
const {
  assignUser,
  removeFromSubtask,
} = require("../controllers/subtasksController");
const router = express.Router();

router.post("/", assignUser);

router.delete("/", removeFromSubtask);

module.exports = router;
