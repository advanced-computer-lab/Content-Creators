import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import axios from "axios";
import "./ChangeSeats.css";
import createRows from "./createRows";
import { useHistory } from "react-router-dom";

export default function ChangeSeats({ chosenSeats, allSeats }) {
    const [rows, setRows] = useState(createRows(allSeats));
    const [requestedSeats, setRequestedSeats] = useState(3);
    const [selected, setSelected] = useState([]);

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
