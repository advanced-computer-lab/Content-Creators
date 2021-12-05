const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const users = require("../routers/users");
const Reservation = require("../models/reservationSchema");
const Flight = require("../models/flightSchema");

router.use("/users", users);

//list all reservations
router.get("/all-reservations", async (req, res) => {
    const allReservations = await Reservation.find();
    await res.status(200).send(allReservations).sendStatus;
});

//1- Removes reservation from user
//2- Sends an email confirmation with refund
router.delete("/delete-reservation/:booking_id", async (req, res) => {
    const newReservation = req.body;

    try {
        const { booking_id } = req.params;
        await Reservation.deleteOne({ booking_id: booking_id });
        console.log(`deleting ${booking_id} is successful`);
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

        // transporter.sendMail(mailOptions, function(error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Email sent: " + info.response);
        //     }
        // });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: `deleting ${flight_number} is unsuccessful`,
            error: err,
        });
    }
});

router.post("/add-reservation", async (req, res) => {
    try {
        const {
            username,
            flight_number,
            cabin_class,
            no_of_adults,
            no_of_children,
            seat_numbers,
            total_price,
        } = req.body.reservation;

        //get flight_id of flight_number
        const flight_id_arr = await Flight.find(
            {
                flight_number: { $eq: flight_number },
            },
            { _id: 1 }
        );
        const flight_id = flight_id_arr[0]._id;

        console.log("flight id object is: ", flight_id);

        const newReservation = new Reservation({
            username: username,
            flight_id: flight_id,
            cabin_class: cabin_class,
            no_of_adults: no_of_adults,
            no_of_children: no_of_children,
            seat_numbers: seat_numbers,
            total_price: total_price,
        });

        await newReservation.save();
        console.log("creating new reservation is successful");
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

        // transporter.sendMail(mailOptions, function(error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Email sent: " + info.response);
        //     }
        // });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "creating new reservation is unsuccessful",
            error: err,
        });
    }
});

router.get("/get_Registration", async (req, res) => {
    const filter = req.query;
    const allReservation = await Reservation.find(filter);
    res.status(200).send(allReservation);
});

router.get("/get-reservationX", async (req, res) => {
    const filter = req.query;
    console.log("req.query YOOOO", req.query);
    const reservationData = await Reservation.find(filter);

    console.log("reservationData is", reservationData);
    console.log("reservationData.flight is", reservationData[0].flight_id);
    const flight_id = reservationData[0].flight_id;
    const filter2 = { _id: flight_id };
    const flightData = await Flight.find(filter2);

    res.status(200).send(flightData);
});

module.exports = router;
