import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import axios from "axios";
import "./BookingSeat.css";

export default function BookingSeat({ cabinClass, requestedSeats }) {
    const [seatData, setSeatData] = useState([
        { seat_number: "Z99", reserved: true },
    ]);
    const [remainingSeats, setRemainingSeats] = useState(-1);
    // const [rows, setRows] = useState([
    //     [
    //         { id: "E0", number: "E0", isReserved: false },
    //         { id: "E1", number: "E1", isReserved: false },
    //     ],
    // ]);

    //this should be passed from booking in previous page
    //first off we have to check whether requestedSeatsNumber<= remainingSeats to continue picking seats
    requestedSeats = 4;
    cabinClass = "economy";

    useEffect(() => {
        getSeats("QWR-235");
    }, []);

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

    const getSeats = async (flightNumber) => {
        try {
            const url = `http://localhost:8000/flights/search?flight_number=${flightNumber}`;
            const response = await axios.get(url);
            const seatFullData = response.data[0].seats[cabinClass];
            setSeatData(seatFullData);
            setRemainingSeats(response.data[0].remaining_seats[cabinClass]);
            // setAllRowsBro();
            // setRows([
            //     seatFullData.map(({ seat_number, reserved }) => {
            //         const createdSeat = {
            //             id: seat_number,
            //             number: seat_number,
            //             isReserved: reserved,
            //         };
            //         return createdSeat;
            //     }),
            // ]);
        } catch (err) {
            console.log(err);
        }
    };

    const rows = [
        [
            { id: "E0", number: "E0", isReserved: false },
            { id: "E1", number: "E1", isReserved: false },
            { id: "E2", number: "E2", isReserved: false },
            { id: "E3", number: "E3", isReserved: false },
            null,
            null,
            { id: "E4", number: "E4", isReserved: false },
            { id: "E5", number: "E5", isReserved: false },
            { id: "E6", number: "E6", isReserved: false },
            { id: "E7", number: "E7", isReserved: false },
        ],
        [
            { id: "E8", number: "E8", isReserved: false },
            { id: "E9", number: "E9", isReserved: false },
            { id: "E10", number: "E10", isReserved: false },
            { id: "E11", number: "E11", isReserved: false },
            null,
            null,
            { id: "E12", number: "E12", isReserved: false },
            { id: "E13", number: "E13", isReserved: false },
            { id: "E14", number: "E14", isReserved: false },
            { id: "E15", number: "E15", isReserved: false },
        ],
        [
            { id: "E16", number: "E16", isReserved: false },
            { id: "E17", number: "E17", isReserved: false },
            { id: "E18", number: "E18", isReserved: false },
            { id: "E19", number: "E19", isReserved: false },
            null,
            null,
            { id: "E20", number: "E20", isReserved: false },
            { id: "E21", number: "E21", isReserved: false },
            { id: "E22", number: "E22", isReserved: false },
            { id: "E23", number: "E23", isReserved: false },
        ],
        [
            { id: "E24", number: "E24", isReserved: false },
            { id: "E25", number: "E25", isReserved: false },
            { id: "E26", number: "E26", isReserved: false },
            { id: "E27", number: "E27", isReserved: false },
            null,
            null,
            { id: "E28", number: "E28", isReserved: false },
            { id: "E29", number: "E29", isReserved: false },
            { id: "x", number: "x", isReserved: false },
            { id: "x", number: "x", isReserved: false },
        ],
    ];

    // const rows = [
    //     [
    //         { id: "E0", number: "E0", isReserved: false },
    //         { id: "E1", number: "E1", isReserved: false },
    //         { id: "E2", number: "E2", isReserved: false },
    //         { id: "E3", number: "E3", isReserved: false },
    //         { id: "E4", number: "E4", isReserved: false },
    //         { id: "E5", number: "E5", isReserved: false },
    //         { id: "E6", number: "E6", isReserved: false },
    //         { id: "E7", number: "E7", isReserved: false },
    //         { id: "E8", number: "E8", isReserved: false },
    //         { id: "E9", number: "E9", isReserved: false },
    //         { id: "E10", number: "E10", isReserved: false },
    //         { id: "E11", number: "E11", isReserved: false },
    //         { id: "E12", number: "E12", isReserved: false },
    //         { id: "E13", number: "E13", isReserved: false },
    //         { id: "E14", number: "E14", isReserved: false },
    //         { id: "E15", number: "E15", isReserved: false },
    //         { id: "E16", number: "E16", isReserved: false },
    //         { id: "E17", number: "E17", isReserved: false },
    //         { id: "E18", number: "E18", isReserved: false },
    //         { id: "E19", number: "E19", isReserved: false },
    //         { id: "E20", number: "E20", isReserved: false },
    //         { id: "E21", number: "E21", isReserved: false },
    //         { id: "E22", number: "E22", isReserved: false },
    //         { id: "E23", number: "E23", isReserved: false },
    //         { id: "E24", number: "E24", isReserved: false },
    //         { id: "E25", number: "E25", isReserved: false },
    //         { id: "E26", number: "E26", isReserved: false },
    //         { id: "E27", number: "E27", isReserved: false },
    //         { id: "E28", number: "E28", isReserved: false },
    //         { id: "E29", number: "E29", isReserved: false },
    //     ],
    // ];

    // const rows = [
    //     [
    //         { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
    //         { id: 2, number: 2, tooltip: "Cost: 15$" },
    //         null,
    //         {
    //             id: 3,
    //             number: "3",
    //             isReserved: true,
    //             orientation: "east",
    //             tooltip: "Reserved by Rogger",
    //         },
    //         { id: 4, number: "4", orientation: "west" },
    //         null,
    //         { id: 5, number: 5 },
    //         { id: 6, number: 6 },
    //     ],
    //     [
    //         {
    //             id: 7,
    //             number: 1,
    //             isReserved: true,
    //             tooltip: "Reserved by Matthias Nadler",
    //         },
    //         { id: 8, number: 2, isReserved: true },
    //         null,
    //         { id: 9, number: "3", isReserved: true, orientation: "east" },
    //         { id: 10, number: "4", orientation: "west" },
    //         null,
    //         { id: 11, number: 5 },
    //         { id: 12, number: 6 },
    //     ],
    //     [
    //         { id: 13, number: 1 },
    //         { id: 14, number: 2 },
    //         null,
    //         { id: 15, number: 3, isReserved: true, orientation: "east" },
    //         { id: 16, number: "4", orientation: "west" },
    //         null,
    //         { id: 17, number: 5 },
    //         { id: 18, number: 6 },
    //     ],
    //     [
    //         { id: 19, number: 1, tooltip: "Cost: 25$" },
    //         { id: 20, number: 2 },
    //         null,
    //         { id: 21, number: 3, orientation: "east" },
    //         { id: 22, number: "4", orientation: "west" },
    //         null,
    //         { id: 23, number: 5 },
    //         { id: 24, number: 6 },
    //     ],
    //     [
    //         { id: 25, number: 1, isReserved: true },
    //         { id: 26, number: 2, orientation: "east" },
    //         null,
    //         { id: 27, number: "3", isReserved: true },
    //         { id: 28, number: "4", orientation: "west" },
    //         null,
    //         { id: 29, number: 5, tooltip: "Cost: 11$" },
    //         { id: 30, number: 6, isReserved: true },
    //     ],
    // ];

    console.log("Number of remaining Seats is: ", remainingSeats);
    console.log("seatData is: ", seatData);
    console.log("ROWS IS: ", rows);

    return (
        <div>
            {/* <h3>{seatData[0].seat_number}</h3> */}
            {/* <h3>{seatData[0].reserved.toString()}</h3> */}
            {/* <h1>{rows[0][0].id}</h1> */}

            <h1>Seat Picker</h1>
            <div style={{ marginTop: "10px" }}>
                <SeatPicker
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
