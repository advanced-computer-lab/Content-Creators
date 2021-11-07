import React from "react";
import "./SearchFilter.css";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

export default function SearchFilter() {
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [flightDate, setFlightDate] = useState("");
    const [airportTo, setAirportTo] = useState("");
    const [airportFrom, setAirportFrom] = useState("");

    const handleAirportTo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAirportTo(value);
        console.log(`name: ${name}, value: ${value}`);
    };

    const handleAirportFrom = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAirportFrom(value);
        console.log(`name: ${name}, value: ${value}`);
    };

    const handleChangeDepTime = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDepartureTime(value);
        console.log(`name: ${name}, value: ${value}`);
    };
    const handleChangeArrTime = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setArrivalTime(value);
        console.log(`name: ${name}, value: ${value}`);
    };

    return (
        <>
            <div class="s002">
                <form>
                    <div class="inner-form">
                        <div class="input-field second-wrap">
                            <label>FROM</label>
                            <div class="icon-wrap">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="airport_from"
                                name="airport_from"
                                placeholder="all"
                                value={airportFrom}
                                onChange={handleAirportFrom}
                            />
                        </div>
                        <div class="input-field second-wrap">
                            <label>TO</label>
                            <div class="icon-wrap">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="airport_to"
                                name="airport_to"
                                placeholder="all"
                                value={airportTo}
                                onChange={handleAirportTo}
                            />
                        </div>
                        <div class="input-field second-wrap">
                            <label>DATE</label>
                            <div class="icon-wrap">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path>
                                </svg>
                            </div>
                            <Flatpickr
                                data-disable-time
                                placeholder="all"
                                value={flightDate}
                                onChange={(date) => {
                                    setFlightDate(date.toString());
                                }}
                            />
                        </div>
                        <div class="input-field second-wrap">
                            <label>DEPARTURE TIME</label>
                            <div class="icon-wrap">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path>
                                </svg>
                            </div>
                            <input
                                type="time"
                                value={departureTime}
                                onChange={handleChangeDepTime}
                                name="departure_time"
                                min="09:00"
                                max="18:00"
                            />
                        </div>
                        <div class="input-field third-wrap">
                            <label>ARRIVAL TIME</label>
                            <div class="icon-wrap">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path>
                                </svg>
                            </div>
                            <input
                                type="time"
                                value={arrivalTime}
                                onChange={handleChangeArrTime}
                                name="arrival_time"
                                min="09:00"
                                max="18:00"
                            />
                        </div>
                        <div class="input-field fifth-wrap">
                            <button class="btn-search" type="button">
                                SET FILTERS
              </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
