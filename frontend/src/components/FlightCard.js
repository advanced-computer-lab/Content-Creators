import React from "react";
import { Component, useState, useEffect } from "react";
import axios from "axios";
import "../components/FlightCard.css";
import Icon from "react-crud-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FlightCard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/flights/all-flights")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
                console.log("error");
            });
    }, []);

    const deleteHandler = async (flightNumber) => {
        try {
            console.log(`Attempting to delete flightNumber: ${flightNumber}`);
            const response = await axios.delete(
                `http://localhost:8000/flights/delete-flight/${flightNumber}`
            );
            setData((prevState) => {
                return prevState.filter((elem) => elem.flight_number != flightNumber);
            });
            console.log(`successfully deleted ${flightNumber}`);
        } catch (err) {
            console.log(`not able to delete ${flightNumber}`);
            console.log(err);
        }
    };

    const editHandler = (flightNumber) => {
        console.log(`Attempting to edit ${flightNumber}`);
    };

    return (
        <div>
            {data.map((data) => {
                return (
                    <div key={data.flight_number} className="flightCard">
                        <div className="flightCard-body">
                            {" "}
                            <h3>Flight Number: {data.flight_number} </h3>
                            <button
                                className="FlightBtns"
                                type="button"
                                onClick={() => editHandler(data.flight_number)}
                            >
                                Edit Flight
              </button>
                            <br />
                            <button
                                className="FlightBtns"
                                type="button"
                                onClick={() => deleteHandler(data.flight_number)}
                            >
                                Delete Flight
              </button>
                        </div>
                        <div className="col1">
                            <h5> Trip Time</h5>
                            <p>Departure: {data.trip_time.departure_time}</p>
                            <p>Arrival: {data.trip_time.arrival_time}</p>
                        </div>
                        <div className="col2">
                            <h5>Seat Number</h5>
                            <p>Economy: {data.seat_number.economy}</p>
                            <p>Business: {data.seat_number.business}</p>
                            <p>First-Class: {data.seat_number.First}</p>
                        </div>
                        <div className="col3">
                            <h5>Airport</h5>
                            <p>From: {data.airport.from}</p>
                            <p>To: {data.airport.to}</p>
                        </div>
                        <div className="col4"> Price: {data.price}</div>
                    </div>
                );
            })}
        </div>
    );
}
