const express = require("express");
const router = express.Router();
const Flight = require("../models/flightSchema");

//should fetch all flights from DB and send json data
router.get("/all-flights", (req, res) => {
  res.send("<h1>All Flights are to be shown here</h1>");
});

//////Getting all flights from the database with isAdmin role valid
//router.get('/view-all-flights', async (req, res) => {
//    if (req.body.User.isAdmin == true) { // checking if it is admin (although not sure if it makes a difference lol)
//        const allFlights = await flights.find();
//        await res.send(allFlights);
//        ;
//    }
//});

////Creating new flight object and saving it to the database.
//router.post('/create-flight', async (req, res) => {
//    if (req.body.User.isAdmin == true) { // checking user is admin
//        const newFlight = await new flights(req.body.flights); //taking from flight from the req json object
//        // save flight to the database.
//        newFlight.save();
//    }
//});

module.exports = router;
