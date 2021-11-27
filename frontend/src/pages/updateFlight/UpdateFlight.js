import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

import { Button } from "../../components/button/Button";
import "../../App.css";
import "./UpdateFlight.css";

function UpdateFlight() {
    // const location = useLocation();
    const history = useHistory();
    const { flight_number, trip_time, trip_date, seat_number, price } =
        history.flight_data;

    const emptyFlight = {
        flight_number: history.flight_data.flight_number,
        trip_date: history.flight_data.trip_date,
        price: history.flight_data.price,
    };
    const emptySeatNumber = seat_number;
    const emptyTripTime = trip_time;
    const emptyAirport = history.flight_data.airport;

    const [flight, setFlight] = useState(emptyFlight);
    const [tripTime, setTripTime] = useState(emptyTripTime);
    const [seatNumber, setSeatNumber] = useState(emptySeatNumber);
    const [airport, setAirport] = useState(emptyAirport);

    const handleChangeFlight = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFlight({ ...flight, [name]: value });
    };

    const handleChangeTripTime = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTripTime({ ...tripTime, [name]: value });
    };
    const handleChangeSeatNumber = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSeatNumber({ ...seatNumber, [name]: value });
    };
    const handleChangeAirport = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAirport({ ...airport, [name]: value });
    };
    const cancel = (e) => {
        window.location.replace("../flights");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
            (flight.flight_number && tripTime.departure_time) ||
            tripTime.arrival_time ||
            flight.trip_date ||
            seatNumber.economy ||
            seatNumber.business ||
            seatNumber.First ||
            airport.from ||
            airport.to ||
            flight.price;

        if (nonEmpty) {
            console.log("Data fully submitted!!");

            const fullFlight = {
                flights: {
                    ...flight,
                    trip_time: tripTime,
                    seat_number: seatNumber,
                    airport: airport,
                },
            };
            // console.log(fullFlight);
            createFlightAxios(fullFlight);

            // setFlight(emptyFlight);
            // setTripTime(emptyTripTime);
            // setSeatNumber(emptySeatNumber);
            // setAirport(emptyAirport);
        } else {
            console.log("Not entire form is filled");
        }
    };

    const createFlightAxios = async (readyFlight) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/flights/update-flight/${readyFlight.flights.flight_number}`,
                readyFlight
            );
            console.log(response);
            if (response.data.success == true) {
                console.log(
                    `successfully updated flight with flightnumber ${readyFlight.flights.flight_number}!`
                );
                history.push("/flights");
                //change route to flights
            } else {
                console.log("not able to update flight!");
            }
        } catch (err) {
            console.log("error occured while posting the flight using axios!");
            console.log(err);
        }
    };

    return (
        // <>
        <div className="UpdateFlight">
            <div className="updateContainer container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">
                            Update Flight: {history.flight_data.flight_number}
                        </h1>
                        <div
                            action="put"
                            className="UpdateFlight form"
                            onSubmit={handleSubmit}
                        >
                            <br />
                            {/* </div> */}

                            <div className="form-group">
                                <p className="display-4 text-center">Departure Time:</p>
                                <input
                                    type="text"
                                    // id="departure_time"
                                    name="departure_time"
                                    className="form-control"
                                    value={tripTime.departure_time}
                                    onChange={handleChangeTripTime}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">Arrival Time:</p>

                                <input
                                    type="text"
                                    // id="arrival_time"
                                    name="arrival_time"
                                    className="form-control"
                                    value={tripTime.arrival_time}
                                    onChange={handleChangeTripTime}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">Trip Date:</p>
                                <input
                                    type="text"
                                    // id="trip_date"
                                    name="trip_date"
                                    className="form-control"
                                    value={flight.trip_date}
                                    onChange={handleChangeFlight}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">
                                    Number of Economy Seats:
                                </p>
                                <input
                                    type="number"
                                    // id="economy"
                                    name="economy"
                                    className="form-control"
                                    value={seatNumber.economy}
                                    onChange={handleChangeSeatNumber}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">
                                    Number of Business Seats:
                                </p>
                                <input
                                    type="number"
                                    // id="business"
                                    name="business"
                                    className="form-control"
                                    value={seatNumber.business}
                                    onChange={handleChangeSeatNumber}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">Number of First Seats:</p>
                                <input
                                    type="number"
                                    // id="First"
                                    name="First"
                                    className="form-control"
                                    value={seatNumber.First}
                                    onChange={handleChangeSeatNumber}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">Departure Airport:</p>
                                <input
                                    type="text"
                                    // id="airport_from"
                                    name="from"
                                    className="form-control"
                                    value={airport.from}
                                    onChange={handleChangeAirport}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">Arrival Airport:</p>
                                <input
                                    type="text"
                                    // id="airport_to"
                                    name="to"
                                    className="form-control"
                                    value={airport.to}
                                    onChange={handleChangeAirport}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">Price:</p>
                                <input
                                    type="number"
                                    // id="price"
                                    name="price"
                                    className="form-control"
                                    value={flight.price}
                                    onChange={handleChangeFlight}
                                    required
                                />
                            </div>
                            <br />

                            {/* <button type="submit">create flight</button> */}
                            <br />

                            <button
                                className="updatebutton"
                                type="submit"
                                value="Update"
                                onClick={handleSubmit}
                            >
                                Update
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

                            <br />
                            {/* </form> */}
                        </div>
                        {/* </article> */}
                    </div>
                </div>
            </div>
        </div>

        // </>
    );
}

export default UpdateFlight;
