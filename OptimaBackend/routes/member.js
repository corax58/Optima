const express = require("express");
const {
  addUser,
  removeUser,
  getMembers,
} = require("../controllers/projectsController");
const router = express.Router();

router.post("/:projectId", addUser);

router.delete("/:projectId", removeUser);

router.get("/:projectId", getMembers);

module.exports = router;
