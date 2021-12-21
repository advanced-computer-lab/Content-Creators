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
    const [enough, setEnough] = useState(true);
    const [selected, setSelected] = useState(chosenSeats);
    const confirmHandler = () => {
        if (enough) {
            history.chosenChangedSeats = selected;
            //call axios backend api url
            console.log("selected", selected);
            history.push("reserved-flights");
        }
    };
    if (changeSeatReservation) {
        return (
            <>
                <h1>Reservation {changeSeatReservation}</h1>
                <h1>Flight {changeSeatFlightNumber}</h1>
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
