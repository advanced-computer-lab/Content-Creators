const nodemailer = require("nodemailer");
const Flight = require("../models/flightSchema");
const updateSeatStatus = require("../routers/updateSeatStatus");
const Reservation = require("../models/reservationSchema");

const deleteReservation = async (req, res) => {
    const reservation_id = req.reservation_id;
    console.log("req in deleteReservation is: ", req);

    try {
        const reservationData = await Reservation.find({ _id: reservation_id });
        const flight_id = reservationData[0].flight_id;
        const seat_numbers = reservationData[0].seat_numbers;
        const cabin_class = reservationData[0].cabin_class;
        console.log("reservationData to delete is:", reservationData);

        const flight_seats_arr = await Flight.find(
            {
                _id: flight_id,
            },
            { seats: 1, remaining_seats: 1 }
        );
        const flight_seats = flight_seats_arr[0].seats;
        let flight_remaining_seats = flight_seats_arr[0].remaining_seats;
        flight_remaining_seats[cabin_class] += seat_numbers.length;
        const newSeats = updateSeatStatus(
            flight_seats,
            seat_numbers,
            cabin_class,
            "delete"
        );
        const filter = { _id: { $eq: flight_id } };
        const update = { seats: newSeats, remaining_seats: flight_remaining_seats };

        const updatedFlight = await Flight.findOneAndUpdate(filter, update, {
            new: true,
        });

        const deletedReservation = await Reservation.deleteOne({
            _id: reservation_id,
        });

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
        return deletedReservation;
    } catch (err) {
        return false;
    }
};

module.exports = {
    deleteReservation,
};
