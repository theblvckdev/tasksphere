const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) return console.log("Error connecting to database", err);

  console.log("Database connection successfull");

  //   creating users tables if it does not exists
  db.query(`CREATE TABLE IF NOT EXISTS users (
        user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci, ENGINE=InnoDB`);

  // creating tasks table if it does not exists
  db.query(`CREATE TABLE IF NOT EXISTS tasks (
      task_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id INT UNSIGNED NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      priority VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      completed TINYINT(0) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci, ENGINE=InnoDB`);
});

module.exports = db;
