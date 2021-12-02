import React from "react";
import "./ReservationDetails.css";
import ReservationDetailsCard from "../../components/reservationDetailsCard/ReservationDetailsCard";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationDetails() {
    const history = useHistory();
    console.log("history", history);
    console.log("history.trip_info", history.trip_info);

    let tripInfo = {
        departure_flight_number: "opop",
        return_flight_number: "wassup",
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
