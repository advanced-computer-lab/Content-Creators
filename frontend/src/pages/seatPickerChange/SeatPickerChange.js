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
    let flightNumber,
        flightId,
        tripId,
        reservationId,
        cabinClass,
        requestedSeats,
        username,
        no_of_adults,
        no_of_children,
        total_price;

    if (history.newReservation)
        ({
            flightNumber,
            flightId,
            tripId,
            reservationId,
            cabinClass,
            requestedSeats,
            username,
            no_of_adults,
            no_of_children,
            total_price,
        } = history.newReservation);

    const pickSeatsHandler = () => {
        if (selected.length >= requestedSeats) {
            console.log("ALL DONE");

            let isExecuted = window.confirm(
                "Are you sure to change your return reservation?"
            );
            if (isExecuted) {
                const newReservation = {
                    newReservation: {
                        trip_id: tripId,
                        reservation_id: reservationId,
                        username,
                        flight_id: flightId,
                        cabin_class: cabinClass,
                        no_of_adults,
                        no_of_children,
                        seat_numbers: selected,
                        total_price,
                    },
                };
                changeReservationAxios(newReservation);
                history.push("/reserved-flights");
            }
        }
    };

    const changeReservationAxios = async (newReservation) => {
        try {
            const url = `http://localhost:8000/trips/change-reservation/`;
            const response = await axios.post(url, newReservation);
        } catch (err) {
            console.log(err);
        }
    };

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
