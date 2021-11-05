const express = require("express");
const router = express.Router();
const Flight = require("../models/flightSchema");
const bp = require("body-parser");
const User = require("../models/userSchema"); //for confirmation purposes later dont know how to use session

//list all
router.get('/all-flights', async (req, res) => {
        const allFlights = await Flight.find();
        
        await res.status(200).send(allFlights).sendStatus;


});

//Creating new flight object and saving it to the database.
router.post("/create-flight", async (req, res) => {
    try {
        const { flight_number, trip_time, trip_date, seat_number, airport, price } =
            req.body.flights;

        const newFlight = new Flight({
            flight_number: flight_number,
            trip_time: trip_time,
            trip_date: trip_date,
            seat_number: seat_number,
            airport: airport,
            price: price,
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

//SEARCH_FLIGHT
//admin checker to be added
router.get("/search-flight", async (req, res) => {
    const searchFlight = req.body;
    if (req.body != null) {
        const flight = await Flight.find(searchFlight.flights);
           await res.status(200).send(flight).sendStatus;

    } else {
        await res.status(400).send({ success : false, message :'No information available'}).sendStatus;
    }
});

module.exports = router;
