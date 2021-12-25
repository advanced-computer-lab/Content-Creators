const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/get-user", async (req, res) => {
    try {
        const token =
            req.headers["authorization"] ||
            req.body.access_token ||
            req.query.access_token;
        const { username } = JSON.parse(atob(token.split(".")[1]));
        let filter = {};
        if (username != "admin") {
            filter = { username };
        }
        const found = await User.find(filter);
        if (found.length == 0) {
            return res
                .status(404)
                .send({ success: false, message: "user not found" });
        }
        const user = found[0];
        console.log("found user is:", user);
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "getting user info is unsuccessful",
            error: err,
        });
    }
});
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

//Edit User
router.put("/edit-user", async (req, res) => {
    try {
        const {
            username,
            password,
            confirm_password,
            first_name,
            last_name,
            address,
            country_code,
            telephone,
            email,
            passport_number,
        } = req.body.user;
        const token =
            req.headers["authorization"] ||
            req.body.access_token ||
            req.query.access_token;
        const user = JSON.parse(atob(token.split(".")[1]));

        if (user.username != username) {
            return res.status(400).send({
                success: false,
                message: "You can not change username of another user!",
            });
        }
        let filter = req.body.user;
        if (password && confirm_password) {
            if (password != confirm_password) {
                return res.status(403).send({
                    success: false,
                    message: "changing password unsuccessful!",
                });
            } else {
                const encryptedPassword = await bcrypt.hash(password, 10);
                filter.password = encryptedPassword;
            }
        }

        console.log("password", password);
        console.log("confirm_password", confirm_password);
        console.log("username in edit-profile is: ", user.username);
        console.log("req.body.user in edit profile: ", req.body.user);
        console.log("Filter is: ", filter);
        const userUpdate = await User.updateOne({ username }, req.body.user);
        console.log("USER UPDATE RESULT IS: ", userUpdate);
        const { acknowledged, modifiedCount } = userUpdate;
        if (acknowledged && modifiedCount == 0) {
            //no changes happened not even if same passowrd entered it will count as modified to counter this;
            //use bcrypt.compare
            return res.status(201).send({ success: true });
        }

        res.status(201).send({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: `updating user is unsuccessful`,
            error: err,
        });
    }
});

module.exports = router;
