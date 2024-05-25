const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  updateProject,
  createProject,
  getProject,
  deleteProject,
  addUser,
  removeUser,
  getMembers,
  getReport,
} = require("../controllers/projectsController");

//projects
router.get("/report/:userId", getReport);

router.get("/:userId/:projectId", getProject);

router.get("/:userId", getAllProjects);

router.post("/:userId", createProject);

router.patch("/:projectId", updateProject);

router.delete("/:projectId", deleteProject);

//members

router.post("/member/:projectId", addUser);

router.delete("/member/:projectId", removeUser);

router.get("/member/:projectId", getMembers);

module.exports = router;
