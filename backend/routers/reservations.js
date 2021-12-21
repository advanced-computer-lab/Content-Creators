const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const users = require("../routers/users");
const Reservation = require("../models/reservationSchema");
const Flight = require("../models/flightSchema");
const updateSeatStatus = require("./updateSeatStatus");
const { addReservation } = require("../controllers/reservationController");

router.use("/users", users);

//list all reservations
router.get("/all-reservations", async (req, res) => {
  const allReservations = await Reservation.find();
  await res.status(200).send(allReservations).sendStatus;
});

router.post("/reservationYasta", addReservation);

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

router.post("/change-seats/:reservation_id", async (req, res) => {
  try {
    const { reservation_id } = req.params;
    const { chosenSeats, chosenChangedSeats, flightNumber } =
      req.body.changeSeats;
    const flightNumberXXX = "Whatever";
    console.log("chosenSeats is: ", chosenSeats);
    console.log("chosenChangedSeats is: ", chosenChangedSeats);
    console.log("reservation_id is: ", reservation_id);

    const reservationUpdate = await Reservation.updateOne(
      { _id: reservation_id },
      { seat_numbers: chosenChangedSeats }
    );
    console.log("reservationUpdate", reservationUpdate);
    if (!reservationUpdate.acknowledged || !reservationUpdate.modifiedCount) {
      return res.status(400).send({
        success: false,
        message: "entered seats make no sense to server!",
      });
    }
    console.log(`Updated seats in Reservation ${reservation_id}`);
    const sampleSeat = chosenSeats[0][0];
    let cabinClass = "economy";
    if (sampleSeat == "B") {
      cabinClass = "business";
    } else if (sampleSeat == "F") {
      cabinClass = "first";
    }

    const seatsUpdate = {};
    chosenSeats.map((seat) => {
      const seatIndex = Number(seat.slice(1));
      const value = [{ seat_number: seat, reserved: false }];
      const key = `seats.${cabinClass}.${seatIndex}`;
      seatsUpdate[key] = value;
    });
    chosenChangedSeats.map((seat) => {
      const seatIndex = Number(seat.slice(1));
      const value = [{ seat_number: seat, reserved: true }];
      const key = `seats.${cabinClass}.${seatIndex}`;
      seatsUpdate[key] = value;
    });
    console.log("seatsUpdate", seatsUpdate);

    const changeFlightSeats = await Flight.updateOne(
      {
        flight_number: flightNumber,
      },
      {
        $set: seatsUpdate,
      }
    );
    console.log(`Updated seats in FLight ${flightNumber}`);
    console.log("changeFlightSeats", changeFlightSeats);

    res.status(201).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "changing seats of reservation is unsuccessful",
      error: err,
    });
  }
});

// module.exports = {router:router,reservation};
module.exports = router;
