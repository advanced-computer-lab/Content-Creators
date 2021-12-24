import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Flatpickr from "react-flatpickr";

import "../../App.css";
import "./UpdateFlight.css";

function UpdateFlight() {
    let location = useLocation();
    const history = useHistory();

    const [data, setData] = useState([]);
    const flightNumber = location.pathname.split("/").at(-1);

    const getFlightAxios = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/flights/search?flight_number=${flightNumber}`
            );
            setData(response.data[0]);
            const {
                flight_number,
                trip_time,
                trip_date,
                cabin_classes,
                airport,
                price,
                baggage_allowance,
            } = response.data[0];

            const originalFlight = {
                flight_number: flight_number,
                trip_date: trip_date,
                price: price,
                baggage_allowance: baggage_allowance,
            };
            setFlight(originalFlight);
            setTripTime(trip_time);
            setCabinClasses(cabin_classes);
            setAirport(airport);
            console.log("Data is: ", data);
            console.log("Response Data is: ", response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFlightAxios();
    }, []);

    const [flight, setFlight] = useState("");
    const [tripTime, setTripTime] = useState("");
    const [cabinClasses, setCabinClasses] = useState("");
    const [airport, setAirport] = useState("");

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
    const handleChangeCabinClasses = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCabinClasses({ ...cabinClasses, [name]: value });
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
            cabinClasses.economy ||
            cabinClasses.business ||
            cabinClasses.First ||
            airport.from ||
            airport.to ||
            flight.price;

        if (nonEmpty) {
            console.log("Data fully submitted!!");

            const fullFlight = {
                flights: {
                    ...flight,
                    trip_time: tripTime,
                    cabin_classes: cabinClasses,
                    airport: airport,
                },
            };
            createFlightAxios(fullFlight);
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

                        <div
                            action="put"
                            className="UpdateFlight form"
                            onSubmit={handleSubmit}
                        >
                            
                            {/* </div> */}
                            <h1 className="display-4 text-center">Update Flight: {flightNumber}</h1>
<p />
<p />
<br />

                            <div class="form-group">
                                <p className="display-4 text-center">Departure Time:</p>
                                <input
                                    type="time"
                                    min="09:00"
                                    max="18:00"
                                    name="departure_time"
                                    className="form-control"
                                    value={tripTime.departure_time}
                                    onChange={handleChangeTripTime}
                                    required
                                />
                            </div>

                            <br />
                            <div class="form-group">
                                <p className="display-4 text-center">Arrival Time:</p>
                                <input
                                    type="time"
                                    min="09:00"
                                    max="18:00"
                                    name="arrival_time"
                                    className="form-control"
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

                            <div className="form-group">
                                <p className="display-4 text-center">
                                    Number of Economy Seats:
                                </p>
                                <input
                                    type="number"
                                    // id="economy"
                                    name="economy"
                                    className="form-control"
                                    value={cabinClasses.economy}
                                    onChange={handleChangeCabinClasses}
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
                                    value={cabinClasses.business}
                                    onChange={handleChangeCabinClasses}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">Number of First Seats:</p>
                                <input
                                    type="number"
                                    // id="First"
                                    name="first"
                                    className="form-control"
                                    value={cabinClasses.first}
                                    onChange={handleChangeCabinClasses}
                                    required
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <p className="display-4 text-center">Departure Airport:</p>
                                <input
                                    type="text"
                                    maxlength="3"
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
                                    maxlength="3"
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
                            <div className="form-group">
                                <p className="display-4 text-center">Baggage Allowance:</p>
                                <input
                                    type="number"
                                    // id="price"
                                    name="baggage_allowance"
                                    className="form-control"
                                    value={flight.baggage_allowance}
                                    onChange={handleChangeFlight}
                                    required
                                />
                            </div>
                            <br />

                            {/* <button type="submit">create flight</button> */}
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
