import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import axios from "axios";
import "./ChangeSeats.css";
import createRows from "./createRows";
import { useHistory } from "react-router-dom";

export default function ChangeSeats({ chosenSeats, allSeats }) {
    const [rows, setRows] = useState(createRows(allSeats));
    const [requestedSeats, setRequestedSeats] = useState(chosenSeats.length);
    const [selected, setSelected] = useState(chosenSeats);
    const [start, setStart] = useState(true);
    console.log("rows are: ", rows);

    useEffect(() => {
        // chosenSeats.map((elem) => {
        //     const row = Number(elem.slice(-1)) / 5 + 1;
        //     const metaInfo = { id: elem, number: Number(elem.slice(-1)), row };
        //     addSeatCallback(metaInfo);
        // });
    }, []);

    const addSeatCallbackCustom = (_, addCb) => {
        chosenSeats.map((elem) => {
            const row = String(Math.floor(Number(elem.slice(1)) / 5) + 1);
            const metaInfo = { row, number: elem, id: elem };
            console.log("metaInfo is:", metaInfo);
            addCb(row, elem, elem);
        });
        setStart(false);
    };

    const addSeatCallback = (elem, addCb) => {
        const { row, number, id } = elem;
        console.log("elem YOOO is: ", elem);
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

    console.log("start is: ", start);
    return (
        <div>
            <div style={{ marginTop: "10px" }}>
                <SeatPicker
                    key={rows}
                    addSeatCallback={(elem, addCb) => {
                        !start
                            ? addSeatCallback(elem, addCb)
                            : addSeatCallbackCustom(elem, addCb);
                    }}
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
