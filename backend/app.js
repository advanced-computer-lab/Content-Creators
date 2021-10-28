const express = require("express");
const mongoose = require("mongoose");
const MongoURI = require("./servers/database");

const app = express();
const port = process.env.PORT || "8000";
const flights = require("./routers/flights");
const users = require("./routers/users");

//add routers here
app.use("/flights", flights);
app.use("/users", users);

//database connection.
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("MongoDB is now connected");

    // Start server once database connection is established
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}...`);
    });
  })
  .catch((err) => console.log(err));

//just to make sure that gets working properly for now... (edit later)
app.get("/", (req, res) => {
  res.status(200).send("<h1>Home Page<h1>");
});
