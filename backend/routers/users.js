const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

//should fetch all users from DB and send json data
router.get("/all-users", (req, res) => {
  res.send("<h1>All Users are show here</h1>");
});

module.exports = router;
