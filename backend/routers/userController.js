import mongoose from 'mongoose';
import express from 'express';
import User from './models/userSchema';
import flights from './models/flightsSchema';
const routerUser = express.Router();

//Getting all flights from the database with isAdmin role valid
routerUser.get('/view-all-flights', async (req, res) => {
        if(req.body.User.isAdmin==true){ // checking if it is admin (although not sure if it makes a difference lol)
            const allFlights = await flights.find();
            
            await res.send(allFlights);
            ;}


});

//Creating new flight object and saving it to the database.
routerUser.post('/create-flight', async (req, res) => {
    if(req.body.User.isAdmin==true){ // checking user is admin
        const newFlight = await new flights(req.body.flights); //taking from flight from the req json object 
        // save flight to the database.
        newFlight.save();
    }

});

