import React from "react";
import "./ReservationDetails.css";
import ReservationDetailsCard from "../../components/reservationDetailsCard/ReservationDetailsCard";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { request } from "http";

function ReservationDetails() {
    const history = useHistory();
    console.log("history", history);
    console.log("history.trip_info", history.trip_info);

    let tripInfo = {
        departure_flight_number: "",
        return_flight_number: "random-flightNumber2",
        departureSeats: [],
        returnSeats: [],
        cabinClass: "",
        requestedSeats: 0,
    };

    if (history.trip_info) {
        tripInfo = history.trip_info;
    }

    return (
        <>
            {/* <h1> Departure Flight Number: {tripInfo.departure_flight_number}</h1> */}
            {/* <h1> Return Flight Number: {tripInfo.return_flight_number}</h1> */}
            <ReservationDetailsCard tripInfo={tripInfo} />
        </>
    );
}

export default ReservationDetails;
