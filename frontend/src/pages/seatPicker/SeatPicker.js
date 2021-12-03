import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BookingSeat from "../../components/bookingSeat/BookingSeat";
import createRows from "../../components/bookingSeat/createRows";
function SeatPicker() {
    const history = useHistory();
    const pickSeatsHandler = () => {
        history.chosenSeats = ["E0", "E1", "E7"];
        history.goBack();
    };
    //this should be passed from booking in previous page
    //first off we have to check whether requestedSeatsNumber<= remainingSeats to continue picking seats
    const requestedSeats = 4;
    const cabinClass = "first";
    const flightNumber = "TKL-234";

    const [remainingSeats, setRemainingSeats] = useState(-1);
    const [rows, setRows] = useState([[]]);
    useEffect(() => {
        getSeats(flightNumber);
    }, []);

    const getSeats = async (flightNumber) => {
        try {
            const url = `http://localhost:8000/flights/search?flight_number=${flightNumber}`;
            const response = await axios.get(url);
            const seatFullData = response.data[0].seats[cabinClass];
            setRemainingSeats(response.data[0].remaining_seats[cabinClass]);
            setRows(createRows(seatFullData));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <BookingSeat rows={rows} />

            <div style={{ textAlign: "center" }}>
                <button type="button" class="btn-confirm" onClick={pickSeatsHandler}>
                    PICK SEATS
                </button>
            </div>
        </>
    );
}

export default SeatPicker;
