const express = require("express");
const {
  getAllTasks,
  createTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

const router = express.Router();

router.get("/", getAllTasks);
router.post("/create-task", createTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
