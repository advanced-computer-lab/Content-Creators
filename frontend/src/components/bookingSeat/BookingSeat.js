import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import axios from "axios";
import "./BookingSeat.css";
import createRows from "./createRows";
import { useHistory } from "react-router-dom";

export default function BookingSeat({ tripInfo, setSelected }) {
    const [rows, setRows] = useState([[]]);
    console.log("TRIP INFO", tripInfo);

    let flightNumber, cabinClass, requestedSeats;

    if (!tripInfo) {
        flightNumber = "QWR-235";
        cabinClass = "first";
        requestedSeats = 5;
    } else {
        flightNumber = tripInfo.flightNumber;
        cabinClass = tripInfo.cabinClass;
        requestedSeats = tripInfo.requestedSeats;
    }

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
    // const addSeatCallback = ({ row, number, id }, addCb) => {
    //     console.log("row", row);
    //     console.log("number", number);
    //     console.log("id", id);
    // };

    // const removeSeatCallback = ({ row, number, id }, removeCb) => {
    //     console.log("row", row);
    //     console.log("number", number);
    //     console.log("id", id);
    // };

    const addSeatCallback = ({ row, number, id }, addCb) => {
        console.log("row", row);
        console.log("number", number);
        console.log("id", id);
        // setSelected(`Added seat ${number}, row ${row}, id ${id}`);

        setSelected((prevState) => {
            const newState = Array.from(prevState);
            newState.push(id);
            return newState;
        });

        // setSelected((prevState) => {
        //     console.log("prevState is: ", prevState);
        //     return prevState.push(id);
        // });

        // const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id);
    };

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
        setSelected((prevState) => {
            let newState = Array.from(prevState);
            newState = newState.filter((x) => x != id);
            return newState;
        });

        removeCb(row, number, id);
    };

    return (
        <div>
            <h1>Flight : {flightNumber}</h1>
            <h1>Pick your {requestedSeats} requested seats!</h1>

            <div style={{ marginTop: "10px" }}>
                <SeatPicker
                    key={rows}
                    addSeatCallback={addSeatCallback}
                    removeSeatCallback={removeSeatCallback}
                    rows={rows}
                    maxReservableSeats={requestedSeats}
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
