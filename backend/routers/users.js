const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");



//should fetch all users from DB and send json data
router.get("/all-users", async (req, res) => {
  const searchUser =await User.find();
  await res.send(searchUser)

});

//check if user is in the database
//and authenticate it (password)
//no encryption used
router.post("/login", async (req, res) => {
  const searchUser = req.body;

  if (req.body != null) {
    
        const user = await User.findOne({username:searchUser.username});
  if(user != null) {
      if(searchUser.password == user.password) {
        await  res.status(200).send({ success : true, message :'Login successful'}).sendStatus;
      }else {
        await res.status(406).send({ success : false, message :'User/Password do not match'}).sendStatus;
    }
  }else{
    await res.status(406).send({ success : false, message :'User not found'}).sendStatus;
  } 
    } else {
     await res.status(400).send({ success : false, message :'No information available'}).sendStatus;
  
}
});

router.put('/sign-up', async (req, res) => {
  const newUser = req.body;
  
  if(req.body ==null){
    await  await res.status(400).send({ success : false, message :'No information available'}).sendStatus;
  }else{
    const addedUser = await User.create(newUser);

  }

});
module.exports = router;
