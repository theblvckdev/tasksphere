const express = require("express");
const {
  createUser,
  loginUser,
  updateUserDetails,
  deleteUsers,
  getAllUsers,
} = require("../controllers/auth.controller");

const router = express.Router();

// auth api routes
router.get("/", getAllUsers);
router.post("/create-user", createUser);
router.post("/login-user", loginUser);
router.put("/:id", updateUserDetails);
router.delete("/:id", deleteUsers);

module.exports = router;
