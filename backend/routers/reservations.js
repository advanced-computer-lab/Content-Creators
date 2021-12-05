const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const users = require("../routers/users");
const Reservation = require("../models/reservationSchema");
const Flight = require("../models/flightSchema");
const updateSeatStatus = require("./updateSeatStatus");
// import updateSeatStatus from "./updateSeatStatus";

router.use("/users", users);

//list all reservations
router.get("/all-reservations", async (req, res) => {
  const allReservations = await Reservation.find();
  await res.status(200).send(allReservations).sendStatus;
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
      { _id: 1, seats: 1, remaining_seats: 1 }
    );
    const flight_id = flight_id_arr[0]._id;
    const flight_seats = flight_id_arr[0].seats;
    let flight_remaining_seats = flight_id_arr[0].remaining_seats;

    flight_remaining_seats[cabin_class] -= seat_numbers.length;
    const newSeats = updateSeatStatus(
      flight_seats,
      seat_numbers,
      cabin_class,
      "add"
    );

    const filter = { _id: { $eq: flight_id } };
    const update = { seats: newSeats, remaining_seats: flight_remaining_seats };

    const updatedFlight = await Flight.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log("updatedFlight is: ", updatedFlight);

    //need to update in flights at the end
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

//1- Removes reservation from user
//2- Sends an email confirmation with refund
router.delete("/delete-reservation/:reservation_id", async (req, res) => {
  const newReservation = req.body;
  const { reservation_id } = req.params;

  try {
    const reservationData = await Reservation.find({ _id: reservation_id });
    const flight_id = reservationData[0].flight_id;
    const seat_numbers = reservationData[0].seat_numbers;
    const cabin_class = reservationData[0].cabin_class;
    console.log("reservationData", reservationData);

    const flight_seats_arr = await Flight.find(
      {
        _id: flight_id,
      },
      { seats: 1, remaining_seats: 1 }
    );
    const flight_seats = flight_seats_arr[0].seats;
    let flight_remaining_seats = flight_seats_arr[0].remaining_seats;
    flight_remaining_seats[cabin_class] += seat_numbers.length;
    console.log("flight_seats are: ", flight_seats);
    console.log("flight_remaining_seats are: ", flight_remaining_seats);
    console.log("cabin_class", cabin_class);

    const newSeats = updateSeatStatus(
      flight_seats,
      seat_numbers,
      cabin_class,
      "delete"
    );
    console.log("newSeats are: ", newSeats);
    const filter = { _id: { $eq: flight_id } };
    const update = { seats: newSeats, remaining_seats: flight_remaining_seats };

    const updatedFlight = await Flight.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log("updatedFlight is: ", updatedFlight);

    await Reservation.deleteOne({ _id: reservation_id });
    console.log(`deleting ${reservation_id} is successful`);
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
      message: `deleting ${reservation_id} is unsuccessful`,
      error: err,
    });
  }
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
