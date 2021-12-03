import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BookingSeat from "../../components/bookingSeat/BookingSeat";
import createRows from "../../components/bookingSeat/createRows";
export default function SeatPicker() {
    const history = useHistory();
    const [choosingDep, setChosingDep] = useState(true);
    const [departureSeats, setDepartureSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);
    const [buttonText, setButtonText] = useState(
        "Continue to Return Flight Seating"
    );

    let departureTripInfo,
        returnTripInfo = {
            departureFlightNumber: "opop",
            returnFlightNumber: "wassup",
            cabinClass: "economy",
            requestedSeats: 4,
        };

    if (history.trip_info) {
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

    const pickSeatsHandler = () => {
        //more conditioons have to be added checking whether a correct amount of seats have
        //been chosen using departureSeats and returnSeats state variables that will be set in the child compoonent BookingSeat
        //probably then length of the array will be checked
        if (choosingDep) {
            setButtonText("Continue Booking");
            setChosingDep((prevState) => !prevState);
        } else {
            const tripInfo = {
                ...history.trip_info,
                departureSeats: departureSeats,
                returnSeats: returnSeats,
            };
            history.trip_info = tripInfo;
            history.push("/reservation-details");
        }
    };
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
                    {buttonText}
                </button>
            </div>
        </>
    );
}
