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
    const [departureChosen, setDepartureChosen] = useState(false);
    const [returnChosen, setReturnChosen] = useState(false);
    const [data, setData] = useState(history.booking_details);

    if (!data) {
        //generally we will get it from history this is just mock data in case url entered directly
        const allInfoTemp = {
            airportFrom: "MUC",
            airportTo: "CAI",
            departureDate: "2021-12-14",
            returnDate: "2021-12-30",
            childrenNumber: "3",
            adultsNumber: "2",
            cabinClass: "economy",
        };
        setData(allInfoTemp);
    }

    return (
        <div>
            <BookingFilter data={data} setData={setData} />

            <button
                onClick={() => {
                    setDepartureChosen(!departureChosen);
                }}
            >
                TOGGLE{" "}
            </button>
            <BookingFlight
                data={data}
                setDepartureChosen={setDepartureChosen}
                title={"Departure Flight:"}
            />

            {departureChosen && (
                <>
                    <BookingFlight
                        data={data}
                        setReturnChosen={setReturnChosen}
                        title={"Return Flight:"}
                    />
                </>
            )}
            {returnChosen && (
                <div style={{ textAlign: "center" }}>
                    <button type="button" class="btn-confirm">
                        CONTINUE BOOKING
                    </button>
                </div>
            )}
        </div>
    );
}
