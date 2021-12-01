import React from "react";
import "../../components/flightCard/FlightCard.css"
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button/Button";

export default function ReservedFlight() {

    let location = useLocation();

    const locationPath = location.pathname.split("/");
    const username = locationPath[locationPath.length -1];
    
    const [data, setData] = useState([]);

    const getReservationAxios = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/reservations/all-reservations/${username}`, /* Send username in the body */
            );
            setData(response.data)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getReservationAxios();
    }, []);


    const history = useHistory();

        
    const routeChange = (path) => {
        history.push(path);
    };

    const submitHandler = (flightNumber) => {
        routeChange(`../reservation-details`);
      };

    return (
        <div>
         {data.map((data) => {
             return (
                 <div key={data.flight_number} className = "flightReservationsCard" onClick = {() => submitHandler(data.flight_number)}>
                     <h3>Booking Id:
                     {data.booking_id}
                     </h3>
                     <h3>Flight Number:
                     {data.flight_number}
                     </h3>
                     <br />
                 </div>
             );
         })}
        </div>
    )
}