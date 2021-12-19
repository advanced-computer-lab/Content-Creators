const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

router.post("/sign-up", async (req, res) => {
    try {
        const {
            username,
            password,
            first_name,
            last_name,
            address,
            country_code,
            telephone,
            email,
            passport_number,
            admin,
        } = req.body.user;

        const validUser =
            username &&
            password &&
            first_name &&
            last_name &&
            address &&
            country_code &&
            telephone &&
            email &&
            passport_number;

        if (!validUser) {
            console.log("not valid");
            return res.status(400).send("All inputs of user are required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            console.log("user exists!");
            return res.status(409).send("User Already Exists!");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log(`hashed password is ${password}`);
        const newUser = new User({
            username,
            password: encryptedPassword,
            first_name,
            last_name,
            address,
            country_code,
            telephone,
            email: email.toLowerCase(),
            passport_number,
            admin,
        });
        await newUser.save();
        console.log(`creating user ${username} is successful!`);
        res.status(201).send({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "creating new user is unsuccessful",
            error: err,
        });
    }
});

module.exports = router;
