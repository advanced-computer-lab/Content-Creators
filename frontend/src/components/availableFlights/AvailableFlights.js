import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AvailableFlights.css";
import { useHistory } from "react-router-dom";

export default function AvailableFlights({
    flights,
    setFlights,
    renewFlights,
}) {
    const history = useHistory();
    const [chosenFlightData, setChosenFlightData] = useState({});
    const [bgColor, setBgColor] = useState("");
    const [chosen, setChosen] = useState(false);
    // const [flights, setFlights] = useState([]);

    const cancelHandler = () => {
        setChosenFlightData("");
        renewFlights();
        setBgColor("");
        setChosen(false);
    };

    return (
        <>
            <h1> Available Return Flights:</h1>
            {flights.map((flight) => {
                return (
                    <div
                        id={flight.flight_number}
                        key={flight.flight_number}
                        name="parentDiv"
                        className="flightCard"
                        style={{ backgroundColor: bgColor, position: "relative" }}
                        onClick={() => {
                            setFlights([flight]);
                            setChosenFlightData(flight);
                            setBgColor("#b89768");
                            setChosen(true);
                        }}
                    >
                        <div className="flightCard-body">
                            <h3>Flight Number: {flight.flight_number} </h3>
                            <div className="col2">
                                <h5> Trip Time:</h5>
                                <p>Departure: {flight.trip_time.departure_time}</p>
                                <p>Arrival: {flight.trip_time.arrival_time}</p>
                            </div>
                            <div className="col2">
                                <p>Baggage Allowance: {flight.baggage_allowance}</p>
                            </div>
                            <div className="col2">
                                <p> Price: {flight.price} </p>
                            </div>
                        </div>
                    </div>
                );
            })}

            {chosen && (
                <div style={{ textAlign: "center" }}>
                    <button
                        type="button"
                        class="btn-confirm"
                        style={{ backgroundColor: "#b30000" }}
                        onClick={cancelHandler}
                    >
                        CANCEL
                    </button>
                </div>
            )}
        </>
    );
}
