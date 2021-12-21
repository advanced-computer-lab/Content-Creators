import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ChangeSeats from "../../components/changeSeats/ChangeSeats";
import createRowsChanging from "../../components/changeSeats/createRowsChanging";

export default function SeatPicker() {
    const history = useHistory();
    let { changeSeatReservation, changeSeatFlightNumber, allSeats, chosenSeats } =
        history;
    console.log("FLIGHT____NUMBER ARE HUSSLEJOOOOOO, ", changeSeatFlightNumber);
    console.log("CHOSEN____SEATS ARE HUSSLEJOOOOOO, ", chosenSeats);
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
