import mongoose from 'mongoose';
import express from 'express';
import User from './models/userSchema';
import flights from './models/flightsSchema';
const routerUser = express.Router();
const Confirmation = false; //flag ?
//Getting all flights from the database with isAdmin role valid
routerUser.get('/view-all-flights', async (req, res) => {
        if(req.session.User.isAdmin==true){ // checking if it is admin (although not sure if it makes a difference lol)
            const allFlights = await flights.find();
            
            await res.send(allFlights);
            ;}


});

//Creating new flight object and saving it to the database.
routerUser.post('/create-flight', async (req, res) => {
    if(req.session.User.isAdmin==true){ // checking user is admin
        const newFlight = await new flights(req.body.flights); //taking from flight from the req json object 
        // save flight to the database.
        newFlight.save();
    }

});

//Delete a Flight from the database
routerUser.delete('delete-flight', async (req, res)=>{
    if(req.session.User.isAdmin==true){
        routerUser.post('/deleteConfirm', async (req, res)=>{ //pop up a confirmation dialog
            Confirmation = req.body.Confirmation; //according to the confirmation dialog if yes then body.confirmation is set to true
        });
        if(Confirmation == true){ // if the user confirmed the delete
        const deleteFlight = req.body.flights; //get the flight object from the user
        flights.remove(deleteFlight);//remove the flight from the database
    }
}
    const count =deleteFlight.deletedCount;
    await res.send(count); //return the number of deleted flight objects
});