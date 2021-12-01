import React from "react";
import "../../components/reservationDetailsCard/reservationDetailsCard.css";
import ReservationDetailsCard from "../../components/reservationDetailsCard/reservationDetailsCard";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationDetails() {
    const history = useHistory();
    console.log("history", history);
    console.log("history.trip_info", history.trip_info);

    let departureFlightNumber = 1;
    let returnFlightNumber = 2;

    if (history.trip_info) {
        const { departure_flight_number, return_flight_number } = history.trip_info;
        departureFlightNumber = departure_flight_number;
        returnFlightNumber = return_flight_number;
    }

    return (
        <>
            <p> Departure Flight Number: {departureFlightNumber}</p>
            <p> Return Flight Number: {returnFlightNumber}</p>
            <ReservationDetailsCard />;
        </>
    );
}

export default ReservationDetails;
