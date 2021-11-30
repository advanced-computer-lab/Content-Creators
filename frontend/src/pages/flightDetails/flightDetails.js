import "./flightDetails.css";
import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button/Button";

export default function FlightDetails(){

    const [data, setData] = useState([]);

    let location = useLocation();

    const locationPath = location.pathname.split("/");
    const flightNumber = locationPath[locationPath.length -1];

    
    const getFlightAxios = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/flights/search?flight_number=${flightNumber}`,
            );
            setData(response.data[0])
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFlightAxios();
    }, []);

    const submitHandler = (flightNumber) => {
        routeChange(`../book-flight/${flightNumber}`);
      };

    const history = useHistory();

    
    const routeChange = (path) => {
        history.push(path);
    };
    return (
        <div>
                <div key={data.flight_number}>
                {/* <div className="col2">
                                <h5> Trip Time:</h5>
                                <p>Departure: {data.trip_time.departure_time}</p>
                                <p>Arrival: {data.trip_time.arrival_time}</p>
                                <p>Date: {data.trip_date}</p>
                            </div>
                            <div className="col2">
                                <h5>Cabin Classes</h5>
                                <p>Economy: {data.cabin_classes.economy}</p>
                                <p>Business: {data.cabin_classes.business}</p>
                                <p>First-Class: {data.cabin_classes.first}</p>
                            </div>
                            <div className="col2">
                                <h5>Airport</h5>
                                <p>From: {data.airport.from}</p>
                                <p>To: {data.airport.to}</p>
                            </div>
                            <div className="col2">
                                <p>Baggage Allowance: {data.baggage_allowance}</p>
                            </div>
                            <div className="col2">
                                <p> Price: {data.price} </p>
                            </div> */}
                            <button type="FlightBtns" value="submit" className="button" onClick={submitHandler}> Book this Flight </button>
                </div>
        </div>
    );
}
