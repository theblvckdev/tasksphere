const express = require("express");
const { createUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

// auth api routes
router.post("/create-user", createUser);
router.post("/login-user", loginUser);

module.exports = router;
