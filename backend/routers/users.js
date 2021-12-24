const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// console.log("PROCESS IS: ", process);
// console.log("PROCESS.ENV IS: ", process.env);
// console.log("TOKEN_SECRET ISSSSSSS: ", process.env.TOKEN_SECRET);

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

router.post("/login", async (req, res) => {
    try {
        let { username, password } = req.body.user;
        if (!(username && password)) {
            return res.status(401).send("All input is required");
        }

        const filter = { username };
        const user = await User.findOne(filter);
        if (!user) {
            return res.status(401).send("User does not exist!");
        }
        console.log("USER is: ", user);
        console.log("USER.admin is: ", user.admin);

        const comparison = await bcrypt.compare(password, user.password);

        console.log("comparison is", comparison);
        if (comparison) {
            const access_token = jwt.sign(
                { user_id: user._id, username, admin: user.admin },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "2h",
                }
            );
            const refresh_token = jwt.sign(
                { user_id: user._id, username, admin: user.admin },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "24h",
                }
            );
            const authorization_data = { username, access_token, refresh_token };
            return res.status(200).json(authorization_data);
        } else {
            return res.status(401).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "login is unsuccessful",
            error: err,
        });
    }
});

module.exports = router;
