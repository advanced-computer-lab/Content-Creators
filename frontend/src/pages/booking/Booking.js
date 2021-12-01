import React from "react";
import "../../App.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import BookingFilter from "../../components/bookingFilter/BookingFilter";
import BookingFlight from "../../components/bookingFlight/BookingFlight";

export default function Booking() {
    const history = useHistory();
    const [depChosen, setDepChosen] = useState(false);
    let data = history.booking_details;

    if (!data) {
        //generally we will get it from history this is just mock data in case url entered directly
        const allInfoTemp = {
            airportFrom: "CAI",
            airportTo: "ZUR",
            departureDate: "2021-12-14",
            returnDate: "2021-12-30",
            childrenNumber: "3",
            adultsNumber: "2",
            cabinClass: "economy",
        };
        data = allInfoTemp;
    }

    return (
        <div>
            <BookingFilter data={data} />

            <button
                onClick={() => {
                    setDepChosen(!depChosen);
                }}
            >
                TOGGLE{" "}
            </button>
            <BookingFlight
                data={data}
                setDepChosen={setDepChosen}
                title={"Departure Flights:"}
            />

            {depChosen && (
                <>
                    <BookingFlight data={data} title={"Return Flights:"} />
                </>
            )}
        </div>
    );
}
