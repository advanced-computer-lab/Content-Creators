const nodemailer = require("nodemailer");
const Flight = require("../models/flightSchema");
const updateSeatStatus = require("../routers/updateSeatStatus");
const Reservation = require("../models/reservationSchema");

const addReservation = async (req, res) => {
    try {
        const {
            username,
            flight_id,
            cabin_class,
            no_of_adults,
            no_of_children,
            seat_numbers,
            total_price,
        } = req.body.reservation;

        const flight_arr = await Flight.find(
            {
                _id: { $eq: flight_id },
            },
            { _id: 1, seats: 1, remaining_seats: 1 }
        );
        const flight_seats = flight_arr[0].seats;
        let flight_remaining_seats = flight_arr[0].remaining_seats;

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

        const reservationData = await newReservation.save();
        console.log("creating new reservation is successful");
        return reservationData._id;
        // res.status(201).send({ success: true });

        // var transporter = nodemailer.createTransport({
        //     service: "outlook",
        //     auth: {
        //         user: "ibnfirnas_acl@outlook.com",
        //         pass: "firnas123",
        //     },
        // });

        // var mailOptions = {
        //     from: "ibnfirnas_acl@outlook.com",
        //     to: "mohamedams14@gmail.com",
        //     subject: "Reservation Confirmation Notice ",
        //     text: "Your reservation has been made!",
        // };
    } catch (err) {
        console.log(err);
        return "";
        // res.status(500).send({
        //     success: false,
        //     message: "creating new reservation is unsuccessful",
        //     error: err,
        // });
        // }
    }
};

module.exports = {
    addReservation,
};
