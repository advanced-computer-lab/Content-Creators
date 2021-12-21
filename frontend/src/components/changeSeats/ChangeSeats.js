import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import axios from "axios";
import "./ChangeSeats.css";
import createRows from "./createRows";
import createRowsChanging from "./createRowsChanging";
import { useHistory } from "react-router-dom";

export default function ChangeSeats({
    chosenSeats,
    allSeats,
    setEnough,
    selected,
    setSelected,
}) {
    const [rows, setRows] = useState(createRowsChanging(allSeats, chosenSeats));
    const [requestedSeats, setRequestedSeats] = useState(chosenSeats.length);
    console.log("rows are: ", rows);
    console.log("chosenSeats are: ", chosenSeats);
    console.log("Selected SEATS: ", selected);

    const addSeatCallback = ({ row, number, id }, addCb) => {
        setSelected((prevState) => {
            const newState = Array.from(prevState);
            newState.push(id);
            return newState;
        });
        addCb(row, number, id);
        selected.length < requestedSeats ? setEnough(true) : setEnough(false);
    };

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
        setSelected((prevState) => {
            let newState = Array.from(prevState);
            newState = newState.filter((x) => x != id);
            return newState;
        });
        removeCb(row, number, id);
        selected.length < requestedSeats ? setEnough(true) : setEnough(false);
    };
    return (
        <div>
            <div style={{ marginTop: "10px" }}>
                <SeatPicker
                    key={"seatPicker"}
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
