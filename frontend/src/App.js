import React from "react";
import Navbar from "./components/navBar/Navbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Flights from "./pages/flights/Flights";
import SignIn from "./pages/signIn/SignIn.js";
import AboutUs from "./pages/aboutUs/AboutUs";
import CreateFlight from "./pages/createFlight/CreateFlight";
import UpdateFlight from "./pages/updateFlight/UpdateFlight";
import Booking from "./pages/booking/Booking";
import ChoosingSeat from "./pages/choosingSeat/ChoosingSeats";
import ReservationDetails from "./pages/reservationDetails/ReservationDetails";


function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/flights" component={Flights} />
                    <Route path="/aboutus" component={AboutUs} />
                    <Route path="/login" component={SignIn} />
                    <Route path="/create-flight" component={CreateFlight} />
                    <Route path="/update-flight" component={UpdateFlight} />
                    <Route path="/booking" component={Booking} />
                    <Route path="/reservation-details" component={ReservationDetails} />

                    <Route path="/choosing_seats" component={ChoosingSeat} />

                </Switch>
            </Router>
        </>
    );
}

export default App;
