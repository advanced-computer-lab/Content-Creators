const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const users = require("../routers/users");
const Trip = require("../models/tripSchema");

//list all trips
router.get("/all-trips", async (req, res) => {
    const allTrips = await Trip.find();
    await res.status(200).send(allTrips).sendStatus;
});

//1- Removes trip from user
router.delete("/delete-trip/:trip_id", async (req, res) => {
    try {
        const { trip_id } = req.params;
        await Trip.deleteOne({ trip_id: trip_id });
        console.log(`deleting ${trip_id} is successful`);
        res.status(201).send({ success: true });

        var transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
                user: "ibnfirnas_acl@outlook.com",
                pass: "firnas123",
            },
        });

        var mailOptions = {
            from: "ibnfirnas_acl@outlook.com",
            to: "alirmazhar1@gmail.com",
            subject: "Reservation Cancel Notice ",
            text: "Your reservation has been canceled. You have been refunded and it will take 10 days to process.",
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: `deleting ${flight_number} is unsuccessful`,
            error: err,
        });
    }
});

//adds trips
router.post("/add-trip", async (req, res) => {
    try {
        const {
            // booking_id,
            username,
            arrival_flight_number,
            departure_flight_number,
        } = req.body.trip;

        const newTrip = new Trip({
            username: username,
            arrival_flight_number: arrival_flight_number,
            departure_flight_number: departure_flight_number,
        });

        await newTrip.save();
        console.log("creating new trip is successful");
        res.status(201).send({ success: true });

        var transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
                user: "ibnfirnas_acl@outlook.com",
                pass: "firnas123",
            },
        });

        var mailOptions = {
            from: "ibnfirnas_acl@outlook.com",
            to: "mohamedams14@gmail.com",
            subject: "Reservation Confirmation Notice ",
            text: "Your reservation has been made!",
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "creating new reservation is unsuccessful",
            error: err,
        });
    }
});

module.exports = router;
