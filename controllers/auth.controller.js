const db = require("../config/database");
const bcrypt = require("bcryptjs");

// create user controller
const createUser = (req, res) => {
  const { full_name, email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error!",
      });
    }

    // check if user with email already exists
    if (data.length) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }

    // hash password from user
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // insert user details into database
    const query =
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
    db.query(query, [full_name, email, hashPassword], (err, data) => {
      if (err) {
        return res.status(401).json({
          error: "Error creating user",
        });
      }

      res.status(200).json({
        message: "User created successfully",
        data,
      });
    });
  });
};

// login user controller
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // validation fields
  if (!email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // check if user exists
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    if (data.length === 0) {
      return res.status(401).json({
        error: "Email address not found",
      });
    }

    const user = data[0];

    // compare client password with hashed password
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }

      //   check if password matched
      if (match) {
        return res.status(200).json({
          message: "Login successfull",
        });
      } else {
        return res.status(401).json({
          error: "Invalid email address or password",
        });
      }
    });
  });
};

module.exports = { createUser, loginUser };
