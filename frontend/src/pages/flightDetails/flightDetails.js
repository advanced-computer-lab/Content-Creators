import "./FlightDetails.css";
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
                <h3>Price: {data.price} </h3>
                <h3>Flight Number: {data.flight_number} </h3>
                    <button type="FlightBtns" value="submit" className="button" onClick={submitHandler}> Book this Flight </button>
                </div>
        </div>
    );
}
