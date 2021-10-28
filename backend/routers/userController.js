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

//user sign in with redirection to the view-all-page (admin home page)
routerUser.get('/sign-in', (req, res) => {
    if(!req.session.User.isActive){
        req.session.User =  User.find({username: req.body.username, password: req.body.password}); // change the session user to the  user from the body
        req.session.User.isActive = true; //make sure the user is active
    }
    // render? or redirect ????
    //res.render('/view-all-flights/'); 
    res.redirect('/view-all-flights/');
});