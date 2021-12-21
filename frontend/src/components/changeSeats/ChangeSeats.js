import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import axios from "axios";
import "./ChangeSeats.css";
import createRows from "./createRows";
import createRowsChanging from "./createRowsChanging";
import { useHistory } from "react-router-dom";

export default function ChangeSeats({ chosenSeats, allSeats }) {
    const [rows, setRows] = useState(createRowsChanging(allSeats, chosenSeats));
    console.log("CHOSEN____SEATS ARE YASTAAAA, ", chosenSeats);
    const [requestedSeats, setRequestedSeats] = useState(chosenSeats.length);
    const [selected, setSelected] = useState(chosenSeats);
    console.log("rows are: ", rows);
    console.log("chosenSeats are: ", chosenSeats);

    const addSeatCallback = ({ row, number, id }, addCb) => {
        setSelected((prevState) => {
            const newState = Array.from(prevState);
            newState.push(id);
            return newState;
        });
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
