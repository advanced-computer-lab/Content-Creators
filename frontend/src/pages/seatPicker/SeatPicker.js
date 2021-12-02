import React from "react";
import "../../App.css";
import { useHistory } from "react-router-dom";
import BookingSeat from "../../components/bookingSeat/bookingSeat";
function SeatPicker() {
    const history = useHistory();
    const pickSeatsHandler = () => {
        history.chosenSeats = ["E0", "E1", "E7"];
        history.goBack();
    };
    return (
        <>
            <BookingSeat />

            <div style={{ textAlign: "center" }}>
                <button type="button" class="btn-confirm" onClick={pickSeatsHandler}>
                    PICK SEATS
                </button>
            </div>
        </>
    );
}

export default SeatPicker;
