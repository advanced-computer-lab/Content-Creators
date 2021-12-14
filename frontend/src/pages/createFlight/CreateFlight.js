import React, { useReducer, useState } from "react";
import "../../App.css";
import axios from "axios";
import "./CreateFlight.css";
import Flatpickr from "react-flatpickr";

function CreateFlight() {
    const emptyFlight = {
        flight_number: "",
        trip_date: "",
        price: "",
        baggage_allowance: "",
    };
    const emptySeatNumber = {
        economy: "",
        business: "",
        first: "",
    };
    const emptyTripTime = {
        departure_time: "",
        arrival_time: "",
    };
    const emptyAirport = { from: "", to: "" };

    const [flight, setFlight] = useState(emptyFlight);
    const [tripTime, setTripTime] = useState(emptyTripTime);
    const [cabin_classes, setSeatNumber] = useState(emptySeatNumber);
    const [airport, setAirport] = useState(emptyAirport);

    const handleChangeFlight = (e) => {
        if (typeof e.target === "object") {
            const name = e.target.name;
            const value = e.target.value;
            setFlight({ ...flight, [name]: value });
        } else {
            setFlight({
                ...flight,
                ["trip_date"]: new Date(e).toISOString().slice(0, 10),
            });
        }
    };

    const handleChangeTripTime = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTripTime({ ...tripTime, [name]: value });
    };
    const handleChangeSeatNumber = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSeatNumber({ ...cabin_classes, [name]: value });
    };
    const handleChangeAirport = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAirport({ ...airport, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
            flight.flight_number &&
            tripTime.departure_time &&
            tripTime.arrival_time &&
            flight.trip_date &&
            cabin_classes.economy &&
            cabin_classes.business &&
            cabin_classes.first &&
            airport.from &&
            airport.to &&
            flight.price &&
            flight.baggage_allowance;

        if (nonEmpty) {
            console.log("Data fully submitted!!");

            const fullFlight = {
                flights: {
                    ...flight,
                    trip_time: tripTime,
                    cabin_classes: cabin_classes,
                    airport: airport,
                },
            };
            // console.log(fullFlight);
            createFlightAxios(fullFlight);

            setFlight(emptyFlight);
            setTripTime(emptyTripTime);
            setSeatNumber(emptySeatNumber);
            setAirport(emptyAirport);
        } else {
            console.log("Not entire form is filled");
        }
    };
    const cancel = (e) => {
        window.location.replace(`flights/all-flights`);
    };

    const createFlightAxios = async (readyFlight) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/flights/create-flight",
                readyFlight
            );
            if (response.data.success) {
                console.log(
                    `successfully created flight with flightnumber ${readyFlight.flights.flight_number}!`
                );
            } else {
                console.log("not able to create flight!");
            }
        } catch (err) {
            console.log("error occured while posting the flight using axios!");
            console.log(err);
        }
    };

    return (
        <>
            <div className="CreateFlight">
                <div
                    action="post"
                    className="CreateFlight form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-control">
                        <p className="display-4 text-center">Flight Number:</p>
                        <input
                            type="text"
                            id="flight_number"
                            name="flight_number"
                            value={flight.flight_number}
                            onChange={handleChangeFlight}
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <p className="display-4 text-center">Departure Time:</p>
                        <input
                            type="time"
                            id="departure_time"
                            name="departure_time"
                            value={tripTime.departure_time}
                            onChange={handleChangeTripTime}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <p className="display-4 text-center">Arrival Time:</p>
                        <input
                            type="time"
                            id="arrival_time"
                            name="arrival_time"
                            value={tripTime.arrival_time}
                            onChange={handleChangeTripTime}
                            required
                        />
                    </div>
                    <br />

                    <div class="form-group">
                        <p className="display-4 text-center">Trip Date:</p>
                        <Flatpickr
                            data-disable-time
                            name="trip_date"
                            className="form-control"
                            placeholder={flight.trip_date}
                            value={tripTime.trip_date}
                            onChange={handleChangeFlight}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <p className="display-4 text-center">Number of Economy Seats:</p>
                        <input
                            type="number"
                            id="economy"
                            name="economy"
                            value={cabin_classes.economy}
                            onChange={handleChangeSeatNumber}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <p className="display-4 text-center">Number of Business Seats:</p>
                        <input
                            type="number"
                            id="business"
                            name="business"
                            value={cabin_classes.business}
                            onChange={handleChangeSeatNumber}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <p className="display-4 text-center">Number of First Seats:</p>
                        <input
                            type="number"
                            id="first"
                            name="first"
                            value={cabin_classes.first}
                            onChange={handleChangeSeatNumber}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <p className="display-4 text-center">Departure Airport:</p>
                        <input
                            type="text"
                            maxlength="3"
                            id="airport_from"
                            name="from"
                            value={airport.from}
                            onChange={handleChangeAirport}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <p className="display-4 text-center">Arrival Airport:</p>
                        <input
                            type="text"
                            maxlength="3"
                            id="airport_to"
                            name="to"
                            value={airport.to}
                            onChange={handleChangeAirport}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-control">
                        <p className="display-4 text-center">Price:</p>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={flight.price}
                            onChange={handleChangeFlight}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <p className="display-4 text-center">Baggage Allowance:</p>
                        <input
                            type="number"
                            id="baggage_allowance"
                            name="baggage_allowance"
                            className="form-control"
                            value={flight.baggage_allowance}
                            onChange={handleChangeFlight}
                            required
                        />
                    </div>
                    <br />
                    <button
                        className="createbutton"
                        type="submit"
                        value="Create"
                        onClick={handleSubmit}
                    >
                        Create Flight
                    </button>
                    <br />
                    <br />

                    <button
                        type="submit"
                        value="Cancel"
                        className="cancelButton"
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateFlight;
