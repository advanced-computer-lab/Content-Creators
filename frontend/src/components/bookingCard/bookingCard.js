import React, { Component, useState } from "react";
import axios from "axios";
import "../../App.css";
import "./bookingCard.css";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Flatpickr from "react-flatpickr";

export default function BookingCard() {
    const history = useHistory();

    const [airportFrom, setAirportFrom] = useState("");
    const [airportTo, setAirportTo] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [childrenNumber, setChildrenNumber] = useState("");
    const [adultsNumber, setAdultsNumber] = useState("");
    const [cabinClass, setCabinClass] = useState("");

    const currentDate = new Date();
    const [minDate, setMinDate] = useState(currentDate);
    const [maxDate, setMaxDate] = useState(
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 6,
            currentDate.getDate()
        )
    );

    //when entire form is filled, add 'history.booking_details' to history object and
    //redirect to '/booking' url to continue booking
    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
            airportFrom &&
            airportTo &&
            departureDate &&
            returnDate &&
            childrenNumber &&
            adultsNumber &&
            cabinClass;

        if (nonEmpty) {
            const allInfo = {
                airportFrom,
                airportTo,
                departureDate,
                returnDate,
                childrenNumber,
                adultsNumber,
                cabinClass,
            };
            console.log("Booking Data fully submitted!!");
            history.booking_details = allInfo;
            history.push("/booking/");
        } else {
            console.log("Not entire form is filled");
        }
    };

    return (
        <div>
            <div className="booking-container">
                <h1 className="booking-title">Book Your Flight Now!</h1>
                <br />
                <div className="form-control">
                    <p className="display-4 text-center">From:</p>
                    <input
                        type="text"
                        id="from"
                        name="from"
                        value={airportFrom}
                        onChange={(e) => setAirportFrom(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <p className="display-4 text-center">To:</p>
                    <input
                        type="text"
                        id="to"
                        name="to"
                        value={airportTo}
                        onChange={(e) => setAirportTo(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <p className="display-4 text-center"> Select Departure Date:</p>
                    <Flatpickr
                        data-disable-time
                        name="departureDate"
                        minDate={new Date()}
                        maxDate={maxDate}
                        className="form-control"
                        placeholder={departureDate}
                        value={departureDate}
                        onChange={(e) =>
                            setDepartureDate(new Date(e).toISOString().slice(0, 10))
                        }
                        required
                    />
                </div>
                <div className="form-control">
                    <p className="display-4 text-center"> Select Return Date:</p>
                    <Flatpickr
                        data-disable-time
                        name="returnDate"
                        minDate={minDate}
                        maxDate={maxDate}
                        className="form-control"
                        placeholder={returnDate}
                        value={returnDate}
                        onChange={(e) =>
                            setReturnDate(new Date(e).toISOString().slice(0, 10))
                        }
                        required
                    />
                </div>

                <div className="form-control">
                    <p className="display-4 text-center">Adults:</p>
                    <input
                        type="number"
                        id="no_of_adults"
                        name="adults"
                        value={adultsNumber}
                        onChange={(e) => setAdultsNumber(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <p className="display-4 text-center">Children:</p>
                    <input
                        type="number"
                        id="no_of_children"
                        name="children"
                        value={childrenNumber}
                        onChange={(e) => setChildrenNumber(e.target.value)}
                    />
                </div>
                <select
                    class="selectpicker"
                    data-style="btn-info"
                    name="selectpicker"
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                >
                    <option name="" value="0">
                        {" "}
                        Select cabin class{" "}
                    </option>
                    <option name="seat_type" value="business">
                        Business
                    </option>
                    <option name="seat_type" value="First">
                        First
                    </option>
                    <option name="seat_type" value="economy">
                        Economy
                    </option>
                </select>
                <button
                    className="createbutton"
                    type="submit"
                    value="Create"
                    onClick={handleSubmit}
                >
                    Continue Booking!
                </button>
            </div>
        </div>
    );
}
