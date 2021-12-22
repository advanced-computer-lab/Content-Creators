import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BookingSeat from "../../components/bookingSeat/BookingSeat";
import createRows from "../../components/bookingSeat/createRows";
export default function SeatPicker() {
    const history = useHistory();
    const [selected, setSelected] = useState([]);
    let flightNumber, flightId, tripId, reservationId, cabinClass, requestedSeats;
    if (history.newReservation)
        ({
            flightNumber,
            flightId,
            tripId,
            reservationId,
            cabinClass,
            requestedSeats,
        } = history.newReservation);
    console.log("history.newReservation", history.newReservation);
    console.log("SELECTED", selected);

    // const tripInfo = { flightNumber, cabinClass, requestedSeats };

    // flightNumber = tripInfo.flightNumber;
    // cabinClass = tripInfo.cabinClass;
    // requestedSeats = tripInfo.requestedSeats;
    const pickSeatsHandler = () => { };

    if (history.newReservation) {
        return (
            <>
                <BookingSeat
                    tripInfo={history.newReservation}
                    setSelected={setSelected}
                />

                <div style={{ textAlign: "center" }}>
                    <button type="button" class="btn-confirm" onClick={pickSeatsHandler}>
                        Confirm
                    </button>
                </div>
            </>
        );
    } else {
        history.push("/reserved-flights");
        return <></>;
    }
}
