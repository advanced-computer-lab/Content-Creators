import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ChangeSeats from "../../components/changeSeats/ChangeSeats";
export default function SeatPicker() {
    const history = useHistory();
    const {
        changeSeatReservation,
        changeSeatFlightNumber,
        allSeats,
        chosenSeats,
    } = history;
    console.log("allSeats", allSeats);
    // console.log("history", history);
    // console.log("changeSeatReservation", changeSeatReservation);
    // console.log("allSeats", allSeats);
    // console.log("chosenSeats", chosenSeats);

    if (changeSeatReservation) {
        return (
            <>
                <h1>Reservation {changeSeatReservation}</h1>
                <h1>Flight {changeSeatFlightNumber}</h1>
                <ChangeSeats chosenSeats={chosenSeats} allSeats={allSeats} />
            </>
        );
    } else {
        history.push("/reserved-flights");
        return <></>;
    }
}
