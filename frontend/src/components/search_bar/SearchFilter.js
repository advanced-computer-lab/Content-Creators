import React from "react";
import "./SearchFilter.css";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import axios from "axios";

export default function SearchFilter({ data, setDataParent, fullData }) {
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [flightDate, setFlightDate] = useState("");
    const [airportTo, setAirportTo] = useState("");
    const [airportFrom, setAirportFrom] = useState("");

    const [filterData, setFilterData] = useState(data);

    const handleAirportTo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAirportTo(value);
    };

    const handleAirportFrom = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAirportFrom(value);
    };

    const handleChangeDepTime = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDepartureTime(value);
    };
    const handleChangeArrTime = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setArrivalTime(value);
    };
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        console.log(`submitted filter form`);
        console.log(`data is:`);
        console.log(data);

        let newData = filterData;

        if (departureTime) {
            newData = filterData.filter(
                (flight) => flight.trip_time.departure_time == departureTime
            );
        }
        if (arrivalTime) {
            newData = filterData.filter(
                (flight) => flight.trip_time.arrival_time == arrivalTime
            );
        }
        if (flightDate) {
            newData = filterData.filter((flight) => flight.trip_date == flightDate);
        }
        if (airportTo) {
            newData = filterData.filter((flight) => flight.airport.to == airportTo);
        }
        if (airportFrom) {
            newData = filterData.filter(
                (flight) => flight.airport.from == airportFrom
            );
        }
        setDataParent(newData);

        //         console.log(
        //             `departureTime is ${departureTime} ,bool: ${Boolean(departureTime)}`
        //         );
        //         console.log(`arrivalTime is ${arrivalTime} ,bool: ${Boolean(arrivalTime)}`);
        //         console.log(`flightDate is ${flightDate} ,bool: ${Boolean(flightDate)}`);
        //         console.log(`airportTo is ${airportTo} ,bool: ${Boolean(airportTo)}`);
        //         console.log(`airportFrom is ${airportFrom} ,bool: ${Boolean(airportFrom)}`);
    };

    //takes a state setter function & fetches all data and binds it to the state variable
    const getAllFlights = async (callFunc) => {
        try {
            const response = await axios.get(
                "http://localhost:8000/flights/all-flights"
            );
            callFunc(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleResetDefaults = (e) => {
        getAllFlights(setFilterData);
        setDepartureTime("");
        setArrivalTime("");
        setFlightDate("");
        setAirportTo("");
        setAirportFrom("");
    };

    useEffect(() => {
        console.log(
            `departureTime is ${departureTime} ,bool: ${Boolean(departureTime)}`
        );
        console.log(`arrivalTime is ${arrivalTime} ,bool: ${Boolean(arrivalTime)}`);
        console.log(`flightDate is ${flightDate} ,bool: ${Boolean(flightDate)}`);
        console.log(`airportTo is ${airportTo} ,bool: ${Boolean(airportTo)}`);
        console.log(`airportFrom is ${airportFrom} ,bool: ${Boolean(airportFrom)}`);

        console.log("CHILD: normal data is");
        console.log(data);

        console.log("CHILD: FULL DATA IS:");
        console.log(fullData);
    });

    return (
        <>
            <div class="s002">
                <form onSubmit={(e) => handleFilterSubmit(e)}>
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
                            <button class="btn-search" type="submit">
                                SET FILTERS
              </button>
                            <button type="button" onClick={(e) => handleResetDefaults(e)}>
                                RESET DEFAULTS
              </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
