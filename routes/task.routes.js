const express = require("express");
const { getAllTasks, createTasks } = require("../controllers/tasks.controller");

const router = express.Router();

router.get("/", getAllTasks);
router.post("/create-task", createTasks);

module.exports = router;
