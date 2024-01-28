const db = require("../config/database");

// get all tasks
const getAllTasks = (req, res) => {
  const user_id = req.body;

  const query = "SELECT * FROM tasks WHERE user_id = ?";
  db.query(query, [user_id], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Sever Error",
        err,
      });
    }

    res.status(200).json(data);
  });
};

// create tasks controller
const createTasks = (req, res) => {
  const { user_id, title, content, priority, category, completed } = req.body;

  const query =
    "INSERT INTO tasks (user_id, title, content, priority, category, completed) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [user_id, title, content, priority, category, completed],
    (err, data) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          err,
        });
      }

      return res.status(200).json({
        message: "Task has been created",
        data,
      });
    }
  );
};

// update task controller
const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { user_id, title, content, priority, category, completed } = req.body;

  const query = "SELECT * FROM tasks WHERE task_id = ?";
  db.query(query, [taskId], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        err,
      });
    }

    if (!data.length) {
      return res.status(409).json({
        error: "Task not found",
      });
    }

    if (data[0].user_id !== user_id) {
      return res.status(401).json({
        error: "You can only update your tasks",
      });
    }

    const query =
      "UPDATE tasks SET title = ?, content = ?, priority = ?, category = ?, completed = ? WHERE task_id = ?";
    db.query(
      query,
      [title, content, priority, category, completed, taskId],
      (err, data) => {
        if (err) {
          return res.status(500).json({
            error: "Internal Server Error",
            err,
          });
        }

        return res.status(200).json({
          error: "Your task hase been updated",
          data,
        });
      }
    );
  });
};

// delete task controller
const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const { user_id } = req.body;

  const query = "SELECT * FROM tasks WHERE task_id = ?";
  db.query(query, [taskId], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        err,
      });
    }

    if (data[0].user_id !== user_id) {
      return res.status(401).json({
        error: "You can only delete your tasks",
      });
    }

    const query = "DELETE FROM tasks WHERE task_id = ?";
    db.query(query, [taskId], (err, data) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          err,
        });
      }

      return res.status(200).json({
        message: "Task has been deleted",
        data,
      });
    });
  });
};

module.exports = { getAllTasks, createTasks, updateTask, deleteTask };
