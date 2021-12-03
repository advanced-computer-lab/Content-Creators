import React from "react";
import "./reservedFlights.css";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Icon } from '@iconify/react';

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
                <div styles = {{alignContent: 'center'}}>
                 <div key={data.flight_number} className = "flightReservationsCard" onClick = {() => submitHandler(data.flight_number)}>
                     <h2>
                    <Icon icon="tabler:brand-booking" /> 
                     {data.booking_id}
                     </h2>
                     <h2><Icon icon="icon-park-outline:round-trip" color="#111" width="24" height="24"/> 
                     {data.flight_number}
                     </h2>
                     <br />
                     <br />
                     <br />
                 </div>
                 </div>
             );
         })}
        </div>
    )
}