const express = require("express");
const router = express.Router();
const Flight = require("../models/flightSchema");
const bp = require('body-parser');
const User =require('../models/userSchema'); //for confirmation purposes later dont know how to use session




//Getting all flights from the database (not with isAdmin role valid for now)
router.get('/all-flights', async (req, res) => {
    // if(req.session.User.isAdmin==true){ // checking if it is admin (although not sure if it makes a difference lol)
    const allFlights = await Flight.find();
        
    await res.send(allFlights);
    // ;}


});

//Creating new flight object and saving it to the database.
router.post('/create-flight', async (req, res) => {
   // if(req.session.User.isAdmin==true){ // checking user is admin
        const  newFlight =  new Flight(
          {
              flight_number: req.body.flights.flight_number,
              trip_time: req.body.flights.trip_time,
  
              trip_date: req.body.flights.trip_date,
              seat_number: {
                  economy: req.body.flights.seat_number.economy,
                  business: req.body.flights.seat_number.business,
                  First: req.body.flights.seat_number.First,
              },
              airport:req.body.flights.airport,
             price: req.body.flights.price
              
          }
      
      ); 

      // save flight to the database.
     
      await newFlight.save(error=>{
          if (error) res.send(error)});

});


//Delete a Flight from the database
router.delete('/delete-flight', async (req, res)=>{
  // if(req.session.User.isAdmin==true){
    
       const deleteFlight = new Flight(req.body.flights)
       await Flight.deleteOne({flight_number:deleteFlight.flight_number});   
       
   //}
 
   const count =deleteFlight.deletedCount;
   await res.send(count); //return the number of deleted flight objects
 });

 //SEARCH_FLIGHT
router.get('/search-flight', async (req, res)=>{
  // if(req.session.User.isAdmin==true){
    
      const searchFlight = req.body;
      if(req.body != null){
      
      const flight = await Flight.find(searchFlight.flights);  
      res.send(flight);
      
      }else{
          await res.send("not found");}
   
 //}

 });
//UPDATE_FLIGHT
router.put('/update-flight', async (req, res) => {
  const searchFlight = req.body;
  if(req.body != null){
  
  const flight = await Flight.findOneAndUpdate(searchFlight.flights);  
  res.send(flight);
  
  }else{
      await res.send("not found");}

})
module.exports = router;
