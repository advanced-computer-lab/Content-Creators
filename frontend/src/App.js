import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Routes,
} from "react-router-dom";
import Flights from "./components/pages/Flights";
import Products from "./components/pages/Products";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn.js";
import AboutUs from "./components/pages/AboutUs";
import CreateFlight from "./components/pages/CreateFlight";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/flights" component={Flights} />
                    <Route path="/aboutus" component={AboutUs} />
                    <Route path="/users/login" component={SignIn} />
                    <Route path="/create-flight" component={CreateFlight} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
