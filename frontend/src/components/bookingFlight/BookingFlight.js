import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingFlight.css";
import { useHistory } from "react-router-dom";

export default function BookingFlight({
    data,
    title,
    setDepartureChosen,
    setReturnChosen,
    setDepartureFlightNumber,
    setReturnFlightNumber,
    departureFlightNumber,
    returnFlightNumber,
}) {
    const history = useHistory();

    const [chosenFlightData, setChosenFlightData] = useState({});
    const [bgColor, setBgColor] = useState("");
    const [chosen, setChosen] = useState(false);
    const [flights, setFlights] = useState([]);

    const {
        airportFrom,
        airportTo,
        departureDate,
        returnDate,
        childrenNumber,
        adultsNumber,
        cabinClass,
    } = data;

    const getAllFlights = async () => {
        try {
            let url = "";
            if (title.includes("Departure")) {
                url = `http://localhost:8000/flights/search?airport.from=${airportFrom}&airport.to=${airportTo}`;
            } else {
                url = `http://localhost:8000/flights/search?airport.from=${airportTo}&airport.to=${airportFrom}`;
            }
            const response = await axios.get(url);
            setFlights(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAllFlights();
    }, []);

    const cancelHandler = () => {
        setChosenFlightData("");
        getAllFlights();
        setBgColor("");
        setChosen(false);
        setReturnChosen(false);
        if (title.includes("Departure")) {
            setDepartureChosen(false);
        }
    };

    return (
        <>
            <>
                <h1>{`${title} ${chosenFlightData.flight_number
                        ? chosenFlightData.flight_number
                        : "Choose One!"
                    }`}</h1>
            </>

            {flights.map((flight) => {
                return (
                    <div
                        id={flight.flight_number}
                        key={flight.flight_number}
                        name="parentDiv"
                        className="flightCard"
                        style={{ backgroundColor: bgColor, position: "relative" }}
                        onClick={(e) => {
                            if (e.target.id != "cancelButton") {
                                setFlights([flight]);
                                setChosenFlightData(flight);
                                setBgColor("#b89768");
                                setChosen(true);
                                if (title.includes("Departure")) {
                                    setDepartureChosen(true);
                                    setDepartureFlightNumber(flight.flight_number);
                                } else {
                                    setReturnChosen(true);
                                    setReturnFlightNumber(flight.flight_number);
                                }
                            }
                        }}
                    >
                        {chosen && (
                            <button id="cancelButton" onClick={cancelHandler}>
                                Cancel Flight
                            </button>
                        )}

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
        </>
    );
}
