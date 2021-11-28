const express = require("express");
const router = express.Router();
const User = require("../models/reservationSchema");
var nodemailer = require('nodemailer');


//list all reservations
router.get("/all-reservations", async (req, res) => {
    const allFlights = await Flight.find();//needs changing
    await res.status(200).send(allFlights).sendStatus;
});



//1- Removes reservation from user 
//2- Sends an email confirmation with refund
router.delete('/delete-reservation', async (req, res) => {
    const newReservation = req.body;//needs changing
    
    if(req.body ==null){
      await res.status(400).send({ success : false, message :'No information available'}).sendStatus;
    }else{
    //   const addedUser = await User.findOne({username:newUser.username})
    //   .update(
    //     { $pull: {flight_number: req.body.reserved_Flights.reserved_flight.flight_number}}
    //   );
    //   await res.status(200).send(addedUser).sendStatus;
      
      var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'ibnfirnas_acl@outlook.com',
          pass: 'firnas123'
        }
      });
      
      var mailOptions = {
        from: 'ibnfirnas_acl@outlook.com',
        to: 'alirmazhar1@gmail.com',
        subject: 'Reservation Cancel Notice ',
        text: 'Your reservation has been canceled. You have been refunded'+ req.body.reserved_Flights.reserved_flight.total_money + 'and it will take 10 days to process.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }  
  });

router.push("/add-reservation", async (req, res) => {
        
});

router.get("/get_Registration", async (req, res) => {
    
});


module.exports = router;