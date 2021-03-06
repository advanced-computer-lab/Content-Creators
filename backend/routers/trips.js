const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const users = require("../models/userSchema");
const Reservation = require("../models/reservationSchema");
const Trip = require("../models/tripSchema");
const flights = require("../models/flightSchema");
const { addReservation } = require("../controllers/reservationController");
const { deleteReservation } = require("../controllers/reservationDelete");

//app.use(verifyToken()); will be read first in the middleware before going to any step here hense authentication.
//list all trips
router.get("/all-trips/", async (req, res) => {
    const token =
        req.headers["authorization"] ||
        req.body.access_token ||
        req.query.access_token;
    const { username } = JSON.parse(atob(token.split(".")[1]));
    console.log("USERNAME OF ALL-TRIPS IS: ", username);
    let filter = {};
    if (username != "admin") {
        filter = { username };
    }
    const allTrips = await Trip.find(filter)
        .populate({
            path: "departure_reservation_id",
            populate: "flight_id",
        })
        .populate({
            path: "return_reservation_id",
            populate: "flight_id",
        });
    // console.log("allTrips", allTrips);

    res.status(200).send(allTrips).sendStatus;
});

//adds trips
router.post("/add-trip", async (req, res) => {
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
        const user = users.findOne({ username: username });
        const usermail = user.email;
        let total_price = departure_reservation_price + return_reservation_price;
        var mailOptions = {
            from: "ibnfirnas_acl@outlook.com",
            to: usermail,
            subject: "Reservation Confirmation Notice ",
            text:
                "Your reservation has been made! total price of " +
                total_price +
                " Departure Trip : {} Flight id : " +
                departureReservation.flight_id +
                "Cabin:" +
                departureReservation.cabin_class +
                " Adults: " +
                departureReservation.no_of_adults +
                " Children: " +
                departureReservation.no_of_children +
                " Seats: " +
                departureReservation.seat_numbers +
                "} " +
                " Return Trip : {} Flight id : " +
                returnReservation.flight_id +
                "Cabin:" +
                returnReservation.cabin_class +
                " Adults: " +
                returnReservation.no_of_adults +
                " Children: " +
                returnReservation.no_of_children +
                " Seats: " +
                returnReservation.seat_numbers +
                "} ",
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
        const filter = { _id: trip_id };
        console.log("filter is: ", filter);
        const tripData = await Trip.find({ _id: trip_id });
        console.log("TRIP DATA IS: ", tripData[0]);
        // const departure_reservation_id, return_reservation_id = undefined
        const { departure_reservation_id, return_reservation_id } = tripData[0];

        const departureReservation = { reservation_id: departure_reservation_id };
        console.log("departureReservation", departureReservation);
        const returnReservation = { reservation_id: return_reservation_id };
        console.log("returnReservation", returnReservation);

        const firstDeleted = await deleteReservation(departureReservation, res);

        if (firstDeleted) {
            console.log("deleted first reservation in trip deletion:", firstDeleted);
            const secondDeleted = await deleteReservation(returnReservation, res);
            if (secondDeleted) {
                console.log(
                    "deleted second reservation in trip deletion:",
                    secondDeleted
                );
                // const total_price_refund =
                //     firstDeleted.seat_numbers.length * firstDeleted.total_price +
                //     secondDeleted.seat_numbers.length * secondDeleted.total_price;

                await Trip.deleteOne({ _id: trip_id });
                console.log(`deleting trip:${trip_id} is successful`);

                // var transporter = nodemailer.createTransport({
                //     service: "outlook",
                //     auth: {
                //         user: "ibnfirnas_acl@outlook.com",
                //         pass: "firnas123",
                //     },
                // });
                // const user = users.findOne({ username: username });
                // const usermail = user.email;
                // var mailOptions = {
                //     from: "ibnfirnas_acl@outlook.com",
                //     to: usermail,
                //     subject: "Reservation Cancel Notice ",
                //     text:
                //         "Your reservation has been canceled! total price refund of " +
                //         total_price_refund,
                // };

                // transporter.sendMail(mailOptions, (error, info) => {
                //     error
                //         ? console.log(error)
                //         : console.log("Email sent: " + info.response);
                // });
            }
        }

        res.status(201).send({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            // message: `deleting ${trip_id} is unsuccessful`,
            message: `deleting trip is unsuccessful`,
            error: err,
        });
    }
});

router.post("/change-reservation", async (req, res) => {
    try {
        const {
            trip_id,
            reservation_id,
            username,
            flight_id,
            cabin_class,
            no_of_adults,
            no_of_children,
            seat_numbers,
            total_price,
            flight_type,
        } = req.body.newReservation;

        console.log("username", username);
        console.log("no_of_adults", no_of_adults);

        const addedReservation = {
            body: {
                reservation: {
                    username,
                    flight_id,
                    cabin_class,
                    no_of_adults,
                    no_of_children,
                    seat_numbers,
                    total_price: total_price + 500,
                },
            },
        };

        //deleting old reservation
        const deletedReservation = await deleteReservation({ reservation_id }, res);
        console.log("deletedReservation", deletedReservation);

        //creating new reservation
        const resultAddReservation = await addReservation(addedReservation, res);
        console.log("resultAddReservation", resultAddReservation);

        let filter;
        if (flight_type == "return") {
            filter = { return_reservation_id: resultAddReservation };
        } else {
            filter = { departure_reservation_id: resultAddReservation };
        }

        //replacing new reservationi in trip
        const reservationUpdate = await Trip.updateOne({ _id: trip_id }, filter);
        console.log("reservationUpdate", reservationUpdate);

        var transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
                user: "ibnfirnas_acl@outlook.com",
                pass: "firnas123",
            },
        });

        const text = `Your return flight reservation on trip ${trip_id} has been canceled and changed to ${reservation_id} on flight_Id ${flight_id}. 
            Total price has been increased from ${total_price} to ${total_price + 500
            }!\n Your seats are: ${seat_numbers}!`;
        var mailOptions = {
            from: "ibnfirnas_acl@outlook.com",
            to: "alirmazhar1@gmail.com",
            subject: "Reservation Cancel Notice ",
            text,
        };
        // transporter.sendMail(mailOptions, (error, info) => {
        //     error ? console.log(error) : console.log("Email sent: " + info.response);
        // });

        res.status(201).send({ success: true });
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
