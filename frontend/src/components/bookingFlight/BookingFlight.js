import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingFlight.css";
import { useHistory } from "react-router-dom";

export default function BookingFlight({
    data,
    title,
    setDepartureChosen,
    setReturnChosen,
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

    // const [flights, setFlights] = useState([
    //     {
    //         flight_number: "ABC123",
    //         trip_time: { departure_time: "1:00", arrival_time: "9:00" },
    //         trip_date: "22/03/2017",
    //         cabin_classes: { economy: 30, business: 45, first: 15 },
    //         airport: { from: "MUC", to: "CAI" },
    //         price: 1500,
    //         baggage_allowance: 1500,
    //     },
    //     {
    //         flight_number: "whatever",
    //         trip_time: { departure_time: "3:00", arrival_time: "12:00" },
    //         trip_date: "22/03/2017",
    //         cabin_classes: { economy: 20, business: 24, first: 20 },
    //         airport: { from: "TAN", to: "ZUR" },
    //         price: 2800,
    //         baggage_allowance: 300,
    //     },
    // ]);

    return (
        <>
            {/* <div> */}
            {/*     <p>{data.airportFrom}</p> */}
            {/*     <p>{data.airportTo}</p> */}
            {/*     <p>{data.departureDate}</p> */}
            {/*     <p>{data.returnDate}</p> */}
            {/*     <p>{data.childrenNumber}</p> */}
            {/*     <p>{data.adultsNumber}</p> */}
            {/*     <p>{data.cabinClass}</p> */}
            {/* </div> */}

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
                        className="flightCard"
                        style={{ backgroundColor: bgColor, position: "relative" }}
                        onClick={() => {
                            setFlights([flight]);
                            setChosenFlightData(flight);
                            setBgColor("#b89768");
                            setChosen(true);
                            if (title.includes("Departure")) {
                                setDepartureChosen(true);
                            } else {
                                setReturnChosen(true);
                            }
                        }}
                    >
                        {chosen && (
                            <button type="button" class="btn-cancel">
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
