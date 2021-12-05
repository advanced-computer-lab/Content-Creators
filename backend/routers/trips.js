const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const users = require("../routers/users");
const Reservation = require("../models/reservationSchema");
const Trip = require("../models/tripSchema");
const flights = require("../models/flightSchema");
const { addReservation } = require("../controllers/reservationController");

//list all trips
router.get("/all-trips/", async (req, res) => {
    //must be wriiten /all-trips/{space} to get all
    const allTrips = await Trip.find()
        .populate({
            path: "departure_reservation_id",
            populate: "flight_id",
        })
        .populate({
            path: "return_reservation_id",
            populate: "flight_id",
        });
    console.log("allTrips", allTrips);

    await res.status(200).send(allTrips).sendStatus;
});

//adds trips
router.post("/add-trip/", async (req, res) => {
    try {
        const {
            username,
            cabin_class,
            no_of_adults,
            no_of_children,
            departure_flight_id,
            departure_seat_numbers,
            return_flight_id,
            return_seat_numbers,
            departure_total_price,
            return_total_price,
        } = req.body.trip;

        const departure_reservation_price =
            departure_seat_numbers.length *
            departure_total_price *
            (no_of_children + no_of_adults);
        const departureReservation = {
            username: username,
            flight_id: departure_flight_id,
            cabin_class: cabin_class,
            no_of_adults: no_of_adults,
            no_of_children: no_of_children,
            seat_numbers: departure_seat_numbers,
            total_price: departure_reservation_price,
        };

        const return_reservation_price =
            return_seat_numbers.length *
            return_total_price *
            (no_of_children + no_of_adults);
        const returnReservation = {
            username: username,
            flight_id: return_flight_id,
            cabin_class: cabin_class,
            no_of_adults: no_of_adults,
            no_of_children: no_of_children,
            seat_numbers: return_seat_numbers,
            total_price: return_reservation_price,
        };

        const reqFirstReservation = {
            body: { reservation: { ...departureReservation } },
        };
        const reqSecondReservation = {
            body: { reservation: { ...returnReservation } },
        };

        const departure_reservation_id = await addReservation(
            reqFirstReservation,
            res
        );
        const return_reservation_id = await addReservation(
            reqSecondReservation,
            res
        );

        console.log("departure_flight_id", departure_flight_id);
        console.log("return_reservation_id", return_reservation_id);

        const newTrip = new Trip({
            username: username,
            departure_reservation_id: departure_reservation_id,
            return_reservation_id: return_reservation_id,
        });

        const finalTrip = await newTrip.save();
        console.log("creating new trip is successful", finalTrip);
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

module.exports = router;
