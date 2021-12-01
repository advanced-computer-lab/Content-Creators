import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import BookingFilter from "../../components/bookingFilter/BookingFilter";
import BookingFlight from "../../components/bookingFlight/BookingFlight";

export default function Booking() {
    const history = useHistory();
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

            <h1> Departure Flights: </h1>
            <BookingFlight data={data} />

            <h1> Return Flights: </h1>
            <BookingFlight data={data} />
        </div>
    );
}
