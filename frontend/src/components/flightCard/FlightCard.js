import React from "react";
import { Component, useState, useEffect } from "react";
import axios from "axios";
import "./FlightCard.css";
import { useHistory } from "react-router-dom";
// import Icon from "react-crud-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FlightCard({ data, setDataParent }) {
    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    };
    const deleteHandler = async (flightNumber) => {
        let isExecuted = window.confirm("Are you sure to delete this flight?");
        if (isExecuted) {
            try {
                console.log(`Attempting to delete flightNumber: ${flightNumber}`);
                const response = await axios.delete(
                    `http://localhost:8000/flights/delete-flight/${flightNumber}`
                );
                setDataParent((prevState) => {
                    return prevState.filter((elem) => elem.flight_number != flightNumber);
                });
                console.log(`successfully deleted ${flightNumber}`);
            } catch (err) {
                console.log(`not able to delete ${flightNumber}`);
                console.log(err);
            }
        } else {
            routeChange(`all-flights`);
        }
    };

    const editHandler = (flightData) => {
        history.flight_data = flightData;
        routeChange(`../update-flight/${flightData.flight_number}`);
    };

    return (
        <div>
            {data.map((data) => {
                return (
                    <div key={data.flight_number} className="flightCard">
                        <link
                            href="https://fonts.googleapis.com/icon?family=Material+Icons"
                            rel="stylesheet"
                        />
                        <script
                            src="https://kit.fontawesome.com/a076d05399.js"
                            crossorigin="anonymous"
                        ></script>
                        <div className="flightCard-body">
                            {" "}
                            <h3>Flight Number: {data.flight_number} </h3>
                            <button
                                className="FlightBtns"
                                type="button"
                                onClick={() => editHandler(data)}
                            >
                                Edit
                                <i class="fas fa-edit"></i>
                            </button>
                            <br />
                            <button
                                className="FlightBtns"
                                type="button"
                                onClick={() => deleteHandler(data.flight_number)}
                            >
                                Delete
                                <i class="material-icons">delete_forever</i>
                            </button>
                            <div className="col2">
                                <h5> Trip Time:</h5>
                                <p>Departure: {data.trip_time.departure_time}</p>
                                <p>Arrival: {data.trip_time.arrival_time}</p>
                                <p>Date: {data.trip_date}</p>
                            </div>
                            <div className="col2">
                                <h5>Cabin Classes</h5>
                                <p>Economy: {data.cabin_classes.economy}</p>
                                <p>Business: {data.cabin_classes.business}</p>
                                <p>First-Class: {data.cabin_classes.first}</p>
                            </div>
                            <div className="col2">
                                <h5>Airport</h5>
                                <p>From: {data.airport.from}</p>
                                <p>To: {data.airport.to}</p>
                            </div>
                            <div className="col2">
                                <p>Baggage Allowance: {data.baggage_allowance}</p>
                            </div>
                            <div className="col2">
                                <p> Price: {data.price} </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
