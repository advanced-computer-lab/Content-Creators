import "./flightDetails.css";
import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { deflateRawSync } from "zlib";

export default function FlightDetails(){
    const trip_time_state ={
        departure_time : "",
        arrival_time : ""
    }
    const cabin_classes_state ={
        economy : "",
        business : "",
        first : ""
    }
    const airport_state ={
        from : "",
        to : ""
    }
    
    const [data, setData] = useState([]);
    const [trip_time, setTime]= useState(trip_time_state);
    const [cabin_classes ,setCabin]= useState(cabin_classes_state);
    const [airport ,setAirport]= useState(airport_state);
    
    let location = useLocation();

    const locationPath = location.pathname.split("/");
    const flightNumber = locationPath[locationPath.length -1];

    
    const getFlightAxios = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/flights/search?flight_number=${flightNumber}`,
            );
            setData(response.data[0])
            setTime(response.data[0].trip_time)
            setCabin(response.data[0].cabin_classes)
            setAirport(response.data[0].airport)
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
                    <div>Trip Number: {data.flight_number}</div>
                <div className="col2">
                                <h5> Trip Time:</h5>
                                <p>Departure: {trip_time.departure_time}</p>
                                <p>Arrival: {trip_time.arrival_time}</p>
                                <p>Date: {data.trip_date}</p>
                            </div>
                            <div className="col2">
                                <h5>Cabin Classes</h5>
                                <p>Economy: {cabin_classes.economy}</p>
                                <p>Business: {cabin_classes.business}</p>
                                <p>First-Class: {cabin_classes.first}</p>
                            </div>
                            <div className="col2">
                                <h5>Airport</h5>
                                <p>From: {airport.from}</p>
                                <p>To: {airport.to}</p>
                            </div>
                            <div className="col2">
                                <p>Baggage Allowance: {data.baggage_allowance}</p>
                            </div>
                            <div className="col2">
                                <p> Price: {data.price} </p>
                            </div>
                    <button type="FlightBtns" value="submit" className="button" onClick={submitHandler}> Book this Flight </button>
                </div>
        </div>
    );
}
