import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import axios from "axios";
import "./BookingSeat.css";
import createRows from "./createRows";
import { useHistory } from "react-router-dom";

export default function BookingSeat({ tripInfo }) {
    const [rows, setRows] = useState([[]]);
    console.log("TRIP INFO", tripInfo);

    const { flightNumber, cabinClass, requestedSeats } = tripInfo;

    useEffect(() => {
        getSeats(flightNumber);
    }, []);

    const getSeats = async (flightNumber) => {
        try {
            const url = `http://localhost:8000/flights/search?flight_number=${flightNumber}`;
            const response = await axios.get(url);
            const seatFullData = response.data[0].seats[cabinClass];
            // setRemainingSeats(response.data[0].remaining_seats[cabinClass]);
            setRows(createRows(seatFullData));
        } catch (err) {
            console.log(err);
        }
    };
    const addSeatCallback = ({ row, number, id }, addCb) => {
        console.log("row", row);
        console.log("number", number);
        console.log("id", id);
    };

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
        console.log("row", row);
        console.log("number", number);
        console.log("id", id);
    };

    return (
        <div>
            <h1>Flight : {flightNumber}</h1>
            <div style={{ marginTop: "10px" }}>
                <SeatPicker
                    key={rows}
                    addSeatCallback={addSeatCallback}
                    removeSeatCallback={removeSeatCallback}
                    rows={rows}
                    maxReservableSeats={3}
                    alpha={false}
                    visible
                    selectedByDefault
                    loading={false}
                    tooltipProps={{ multiline: true }}
                />
            </div>
            <br style={{ marginBottom: "3em" }} />
        </div>
    );
}
