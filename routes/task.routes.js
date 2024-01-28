const express = require("express");
const {
  getAllTasks,
  createTasks,
  updateTask,
} = require("../controllers/tasks.controller");

const router = express.Router();

router.get("/", getAllTasks);
router.post("/create-task", createTasks);
router.put("/:id", updateTask);

module.exports = router;
