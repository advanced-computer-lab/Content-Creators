import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BookingSeat from "../../components/bookingSeat/BookingSeat";
import createRows from "../../components/bookingSeat/createRows";
export default function SeatPicker() {
    const history = useHistory();
    const pickSeatsHandler = () => {
        history.chosenSeats = ["E0", "E1", "E7"];
        history.goBack();
    };
    const [choosingDep, setChosingDep] = useState(true);
    const [departureSeats, setDepartureSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);

    console.log("history.trip_info", history.trip_info);
    let departureTripInfo,
        returnTripInfo = {
            departureFlightNumber: "opop",
            returnFlightNumber: "wassup",
            cabinClass: "economy",
            requestedSeats: 4,
        };

    console.log("info undefined?", history.trip_info == undefined);
    if (history.trip_info) {
        // tripInfo = history.trip_info;
        const {
            departureFlightNumber,
            returnFlightNumber,
            cabinClass,
            requestedSeats,
        } = history.trip_info;
        const allInfo = { cabinClass, requestedSeats };

        departureTripInfo = { ...allInfo, flightNumber: departureFlightNumber };
        returnTripInfo = { ...allInfo, flightNumber: returnFlightNumber };
    }

    // if (seatData) {
    //     flightType = seatData.flightType;
    //     flightNumber = seatData.flightNumber;
    //     requestedSeats = seatData.requestedSeats;
    //     cabinClass = seatData.cabinClass;
    // }
    // console.log("seatData IS", seatData);
    // const [remainingSeats, setRemainingSeats] = useState(-1);
    return (
        <>
            {choosingDep && (
                <BookingSeat
                    tripInfo={departureTripInfo}
                    title="Departure"
                    setSeats={setDepartureSeats}
                />
            )}
            {!choosingDep && (
                <BookingSeat
                    tripInfo={returnTripInfo}
                    title="Return"
                    setSeats={setReturnSeats}
                />
            )}

            <div style={{ textAlign: "center" }}>
                <button type="button" class="btn-confirm" onClick={pickSeatsHandler}>
                    Continue
                </button>
            </div>
        </>
    );
}
