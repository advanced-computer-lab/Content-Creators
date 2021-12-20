const express = require("express");
const mongoose = require("mongoose");
const MongoURI = require("./servers/database");
const cors = require("cors");

const app = express();
const port = process.env.PORT || "8000";
const flights = require("./routers/flights");
const users = require("./routers/users");
const reservations = require("./routers/reservations");
const trips = require("./routers/trips");
const auth = require("./middleware/auth");

//add routers here

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
// app.use(auth);

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.use("/flights", flights);
app.use("/users", users);
app.use("/reservations", reservations);
app.use("/trips", trips);

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
