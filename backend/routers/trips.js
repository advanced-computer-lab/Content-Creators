const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const users = require("../routers/users");
const Trip = require("../models/tripSchema");

//list all trips
router.get("/all-trips/:trip_id", async (req, res) => { //must be wriiten /all-trips/{space} to get all
    const allTrips = await Trip.find();

    if(req.params != null){
        const {trip_id} = req.params;
        const filter = {trip_id: trip_id}
         allTrips : await Trip.find(filter);

    }
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
            message: `deleting ${trip_id} is unsuccessful`,
            error: err,
        });
    }
});

//adds trips
router.post("/add-trip/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const {
            departure_booking_id,
            return_booking_id,
        } = req.body.trip;

        const newTrip = new Trip({
            username: username,
            return_booking_id: return_booking_id,
            departure_booking_id: departure_booking_id,
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
