import React, { Component, useState } from "react";
import axios from "axios";
import "../../App.css";
import "./BookingFlight.css";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Flatpickr from "react-flatpickr";

export default function BookingFlight() {
    // const {
    //     airportFrom,
    //     airportTo,
    //     departureDate,
    //     returnDate,
    //     childrenNumber,
    //     adultsNumber,
    //     cabinClass,
    // } = data;

    const data = [
        {
            flight_number: "ABC123",
            trip_time: { departure_time: "1:00", arrival_time: "9:00" },
            trip_date: "22/03/2017",
            cabin_classes: { economy: 30, business: 45, first: 15 },
            airport: { from: "MUC", to: "CAI" },
            price: 1500,
            baggage_allowance: 1500,
        },
        {
            flight_number: "whatever",
            trip_time: { departure_time: "3:00", arrival_time: "12:00" },
            trip_date: "22/03/2017",
            cabin_classes: { economy: 20, business: 24, first: 20 },
            airport: { from: "TAN", to: "ZUR" },
            price: 2800,
            baggage_allowance: 300,
        },
    ];

    return (
        <>
            {data.map((data) => {
                return (
                    <div key={data.flight_number} className="flightCard">
                        <link
                            href="https://fonts.googleapis.com/icon?family=Material+Icons"
                            rel="stylesheet"
                        />
                        <script
                            src="https://kit.fontawesome.com/a076d05399.js"
                            crossorigin="anonymous"
                        ></script>
                        <div className="flightCard-body">
                            <h3>Flight Number: {data.flight_number} </h3>
                            <div className="col2">
                                <h5> Trip Time:</h5>
                                <p>Departure: {data.trip_time.departure_time}</p>
                                <p>Arrival: {data.trip_time.arrival_time}</p>
                            </div>
                            <div className="col2">
                                <p>Baggage Allowance: {data.baggage_allowance}</p>
                            </div>
                            <div className="col2">
                                <p> Price: {data.price} </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
