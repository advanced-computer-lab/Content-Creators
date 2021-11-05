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

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/flights" component={Flights} />
                    <Route path="/about" component={Products} />
                    <Route path="/sign-up" component={SignUp} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
