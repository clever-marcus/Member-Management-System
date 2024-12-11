const express = require("express");
const { signupUser } = require("../Controllers/SignUp");

const router = express.Router();

router.post("/register", signupUser);

module.exports = router;