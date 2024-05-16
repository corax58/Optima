const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  updateProject,
  createProject,
  getProject,
  deleteProject,
} = require("../controllers/projectsController");

// const { getAllProjects } = require("../controllers/projectsController");

//projects

router.get("/:userId/:projectId", getProject);

router.get("/:userId", getAllProjects);

router.post("/:userId", createProject);

router.patch("/:projectId", updateProject);

router.delete("/:projectId", deleteProject);

module.exports = router;
