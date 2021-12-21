import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ChangeSeats from "../../components/changeSeats/ChangeSeats";
import createRowsChanging from "../../components/changeSeats/createRowsChanging";

export default function SeatPicker() {
    const history = useHistory();
    let flightNumber, reservationId, allSeats, chosenSeats;

    if (history.changeSeatInfo) {
        flightNumber = history.changeSeatInfo.flightNumber;
        reservationId = history.changeSeatInfo.reservationId;
        allSeats = history.changeSeatInfo.allSeats;
        chosenSeats = history.changeSeatInfo.chosenSeats;
    }

    const [enough, setEnough] = useState(true);
    const [selected, setSelected] = useState(chosenSeats);

    const changeReservationSeats = async (reservationId, changeSeatBody) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/reservations/change-seats/${reservationId}`,
                changeSeatBody
            );
            if (response.data.success) {
                console.log(
                    `successfully changed seats of flight ${changeSeatBody.flightNumber}!`
                );
            } else {
                console.log("not able to change seats of flight!");
            }
        } catch (err) {
            console.log("error occured while posting the changing of seats!");
            console.log(err);
        }
    };

    const confirmHandler = () => {
        if (enough) {
            history.chosenChangedSeats = selected;
            const changeSeatBody = {
                changeSeats: {
                    chosenSeats,
                    chosenChangedSeats: selected,
                    flightNumber,
                },
            };
            changeReservationSeats(reservationId, changeSeatBody);
            history.push("reserved-flights");
        }
    };
    if (reservationId) {
        return (
            <>
                <h1>Reservation {reservationId}</h1>
                <h1>Flight {flightNumber}</h1>
                <ChangeSeats
                    chosenSeats={chosenSeats}
                    allSeats={allSeats}
                    setEnough={setEnough}
                    selected={selected}
                    setSelected={setSelected}
                />
                <div style={{ textAlign: "center" }}>
                    <button type="button" class="btn-confirm" onClick={confirmHandler}>
                        Confirm
                    </button>
                </div>
                {!enough && <h1>Not enough seats chosen</h1>}
            </>
        );
    } else {
        history.push("/reserved-flights");
        return <></>;
    }
}
