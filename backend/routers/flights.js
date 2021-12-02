const express = require("express");
const router = express.Router();
const Flight = require("../models/flightSchema");
const bp = require("body-parser");
const User = require("../models/userSchema"); //for confirmation purposes later dont know how to use session

//list all
router.get("/all-flights", async (req, res) => {
    const allFlights = await Flight.find();
    await res.status(200).send(allFlights).sendStatus;
});

//search flights by flight_number only for now
router.get("/search", async (req, res) => {
    const filter = req.query;
    const allFlights = await Flight.find(filter);
    await res.status(200).send(allFlights);
});

//Creating new flight object and saving it to the database.
router.post("/create-flight", async (req, res) => {
    try {
        const {
            flight_number,
            trip_time,
            trip_date,
            cabin_classes,
            airport,
            price,
            baggage_allowance,
        } = req.body.flights;

        const { economy, business, first } = cabin_classes;
        const remaining_seats = {
            economy: economy,
            business: business,
            first: first,
        };

        let economySeats = [];
        let businessSeats = [];
        let firstSeats = [];

        for (let i = 0; i < economy; i++) {
            const seat = { seat_number: `E${i}`, reserved: false };
            economySeats.push(seat);
        }
        for (let i = 0; i < business; i++) {
            const seat = { seat_number: `B${i}`, reserved: false };
            businessSeats.push(seat);
        }
        for (let i = 0; i < first; i++) {
            const seat = { seat_number: `F${i}`, reserved: false };
            firstSeats.push(seat);
        }
        const seats = {
            economy: economySeats,
            business: businessSeats,
            first: firstSeats,
        };

        const newFlight = new Flight({
            flight_number: flight_number,
            trip_time: trip_time,
            trip_date: trip_date,
            cabin_classes: cabin_classes,
            airport: airport,
            price: price,
            baggage_allowance: baggage_allowance,
            seats: seats,
            remaining_seats: remaining_seats,
        });

        await newFlight.save();
        console.log("creating new flight is successful");
        res.status(201).send({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "creating new flight is unsuccessful",
            error: err,
        });
    }
});

//Delete a Flight from the database
// admin checker to be added
router.delete("/delete-flight/:flight_number", async (req, res) => {
    try {
        const { flight_number } = req.params;
        await Flight.deleteOne({ flight_number: flight_number });
        console.log(`deleting ${flight_number} is successful`);
        res.status(201).send({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: `deleting ${flight_number} is unsuccessful`,
            error: err,
        });
    }
});

//UPDATE_FLIGHT
// admin checker to be added
router.put("/update-flight/:flight_number", async (req, res) => {
    const { flight_number } = req.params;
    try {
        const updateFlight = req.body.flights;
        const filter = { flight_number: flight_number };
        const updated = await Flight.findOneAndUpdate(filter, updateFlight, {
            rawResult: true,
        });

        //check if an update actually took place
        if (updated.lastErrorObject.updatedExisting) {
            console.log(`updating ${flight_number} is successful`);
            res.status(201).send({ success: true });
        } else {
            res.status(400).send({
                success: false,
                message: `updating ${flight_number} is unsuccessful`,
                error: err,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: `updating ${flight_number} is unsuccessful`,
            error: err,
        });
    }
});

module.exports = router;
