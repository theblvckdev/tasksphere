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

module.exports = { getAllTasks, createTasks };
