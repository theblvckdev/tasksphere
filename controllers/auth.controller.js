const db = require("../config/database");
const bcrypt = require("bcryptjs");

// get all users controllers
const getAllUsers = (req, res) => {
  const query =
    "SELECT user_id, full_name, email, created_at, updated_at FROM users";
  db.query(query, [], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        err,
      });
    }

    return res.status(200).json({
      message: "Getting all users",
      data,
    });
  });
};

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

// update user details
const updateUserDetails = (req, res) => {
  const id = req.params.id;
  const { full_name, email } = req.body;

  const query = "SELECT * FROM users WHERE user_id = ?";
  db.query(query, [id], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        err,
      });
    }

    // check if user with id exists
    if (!data.length) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // update user details in db
    const updateQuery =
      "UPDATE users SET full_name = ?, email = ? WHERE user_id = ?";
    db.query(updateQuery, [full_name, email, id], (err, data) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
          err,
        });
      }

      return res.status(200).json({
        message: "User details updated",
        data,
      });
    });
  });
};

// delete users controller
const deleteUsers = (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM users WHERE user_id = ?";
  db.query(query, [id], (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        err,
      });
    }

    return res.status(200).json({
      message: `User ${id} has been deleted`,
      data,
    });
  });
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  updateUserDetails,
  deleteUsers,
};
