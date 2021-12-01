import React from "react";
import "./BookingFilter.css";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import axios from "axios";

export default function BookingFilter({ data, setData }) {
    const [airportFrom, setAirportFrom] = useState(data.airportFrom);
    const [airportTo, setAirportTo] = useState(data.airportTo);
    const [departureDate, setDepartureDate] = useState(data.departureDate);
    const [returnDate, setReturnDate] = useState(data.returnDate);
    const [childrenNumber, setChildrenNumber] = useState(data.childrenNumber);
    const [adultsNumber, setAdultsNumber] = useState(data.adultsNumber);
    const [cabinClass, setCabinClass] = useState(data.cabinClass);

    const handleFilterSubmit = (e) => {
        e.preventDefault();

        const data = {
            airportFrom,
            airportTo,
            departureDate,
            returnDate,
            childrenNumber,
            adultsNumber,
            cabinClass,
        };
        setData(data);

        console.log(`submitted filter form`);
        console.log(`data is:`);
        console.log(data);
    };

    const handleResetOriginals = () => {
        console.log("handling reset defaults");
    };

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
                                onChange={(e) => setAirportFrom(e.target.value)}
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
                                onChange={(e) => setAirportTo(e.target.value)}
                            />
                        </div>
                        <div class="input-field second-wrap">
                            <label>DEPARTURE DATE</label>
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
                                value={departureDate}
                                onChange={(e) =>
                                    setDepartureDate(new Date(e).toISOString().slice(0, 10))
                                }
                            />
                        </div>
                        <div class="input-field second-wrap">
                            <label>RETURN DATE</label>
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
                                value={returnDate}
                                onChange={(e) =>
                                    setReturnDate(new Date(e).toISOString().slice(0, 10))
                                }
                            />
                        </div>

                        <div class="input-field second-wrap">
                            <label>ADULTS NO.</label>
                            <input
                                type="number"
                                value={adultsNumber}
                                onChange={(e) => setAdultsNumber(e.target.value)}
                                name="adults_number"
                                min="09:00"
                                max="18:00"
                            />
                        </div>

                        <div class="input-field second-wrap">
                            <label>CHILDREN NO.</label>
                            <input
                                type="number"
                                value={childrenNumber}
                                onChange={(e) => setChildrenNumber(e.target.value)}
                                name="children_number"
                                min="09:00"
                                max="18:00"
                            />
                        </div>

                        <div class="input-field second-wrap">
                            <label>CABIN CLASS</label>
                            <input
                                type="text"
                                value={cabinClass}
                                onChange={(e) => setCabinClass(e.target.value)}
                                name="cabin_class"
                                min="09:00"
                                max="18:00"
                            />
                        </div>

                        <div class="input-field fifth-wrap">
                            <button class="btn-search" type="submit">
                                Edit Criteria
                            </button>
                            <button type="button" onClick={(e) => handleResetOriginals(e)}>
                                RESET ORIGINAL
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
