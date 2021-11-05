import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import axios from "axios";

export default function Flights() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/flights/all-flights")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
                console.log("error");
            });
    }, []);

    return (
        <div>
            {data.map((data) => {
                return (
                    <div key={data.flight_number}>
                        <div> Flight Number: {data.flight_number}</div>
                        <div>
                            <h4> Trip Time</h4>
                            <p>Departure: {data.trip_time.departure_time}</p>
                            <p>Arrival: {data.trip_time.arrival_time}</p>
                        </div>
                        <div>
                            <h4>Seat Number</h4>
                            <p>Economy: {data.seat_number.economy}</p>
                            <p>Business: {data.seat_number.business}</p>
                            <p>First-Class: {data.seat_number.First}</p>
                        </div>
                        <div>
                            <h4>Airport</h4>
                            <p>From: {data.airport.from}</p>
                            <p>To: {data.airport.to}</p>
                        </div>
                        <div> Price: {data.price}</div>

                        <br />
                    </div>
                );
            })}
        </div>
    );
}
