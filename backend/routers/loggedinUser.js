const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/get-user", (req, res) => {
    const token =
    req.headers["authorization"] ||
    req.body.access_token ||
    req.query.access_token;
    const { username } = JSON.parse(atob(token.split(".")[1]));
    let filter = {};
    if (username != "admin") {
        filter = { username };
    }
    const found = User.findOne(filter);
    res.status(201).send(found);
});

module.exports = router;
