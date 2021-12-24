import "./FlightDetails.css";
import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { deflateRawSync } from "zlib";
import { Icon } from "@iconify/react";

export default function FlightDetails() {
    const trip_time_state = {
        departure_time: "",
        arrival_time: "",
    };
    const cabin_classes_state = {
        economy: "",
        business: "",
        first: "",
    };
    const airport_state = {
        from: "",
        to: "",
    };

    const [data, setData] = useState([]);
    const [trip_time, setTime] = useState(trip_time_state);
    const [cabin_classes, setCabin] = useState(cabin_classes_state);
    const [airport, setAirport] = useState(airport_state);

    let location = useLocation();

    const locationPath = location.pathname.split("/");
    const flightNumber = locationPath[locationPath.length - 1];

    const getFlightAxios = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/flights/search?flight_number=${flightNumber}`
            );
            setData(response.data[0]);
            setTime(response.data[0].trip_time);
            setCabin(response.data[0].cabin_classes);
            setAirport(response.data[0].airport);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFlightAxios();
    }, []);

    const submitHandler = (flightNumber) => {
        routeChange(`/booking`);
    };

    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    };
    return (
        <div>
            {/* <div styles = {{alignContent: 'center', objectFit: 'contain'}}> */}
            <div className="detailsContainer">
                <div key={data.flight_number} className="flightDetailsCard6">
                <Icon
                        icon="icon-park-outline:round-trip"
                        color="#111"
                        width="48"
                        height="48"
                    />
                <h2>Flight Number:</h2> 
                    {/* <p /> */}
                    <h2>{data.flight_number}</h2>
                </div>
                <br />
                <div key={data.flight_number} className="flightDetailsCard">
                <Icon icon="ic:twotone-date-range" width="24" height="24" />
                    <h2>Date:</h2>
                    <h2>{data.trip_date}</h2>
                </div>
                <br />
                <br />
                <div key={data.flight_number} className="flightDetailsCard">
                    {/* <div className="col2"> */}
                    <Icon icon="ic:round-access-time-filled" color="#111" hFlip={true} />
                    <h3>Departure: {trip_time.departure_time}</h3>
                    <h3>Arrival: {trip_time.arrival_time}</h3>
                </div>
                <br />
                <br />

                <div key={data.flight_number} className="flightDetailsCard5">
                    <h3>Price:</h3> 
                    <h3>{data.price} </h3>
                    <Icon
                        icon="si-glyph:tag-price"
                        color="#111"
                        rotate={3}
                        hFlip={true}
                    />
                    <p />
                    <p />
                    <p />
                    <p />
                    <h3>Baggage:</h3> 
                    <h3>{data.baggage_allowance}</h3>
                    <Icon icon="noto-v1:baggage-claim" hFlip={true} />
                </div>
                <br />
                <br />

                <div key={data.flight_number} className="flightDetailsCard2">
                    <Icon icon="emojione-monotone:airplane-departure"></Icon>
                    <h3>From:</h3> 
                    <h2>{airport.from}</h2>
                    <Icon icon="emojione-monotone:airplane-arrival" />
                    <h3>To:</h3> 
                    <h2>{airport.to}</h2>
                </div>
                <br />
                <br />
                <div key={data.flight_number} className="flightDetailsCard1">
                    <Icon icon="emojione:seat" />
                    <p>Economy: {cabin_classes.economy}</p>
                    <Icon icon="emojione-v1:seat" />
                    <p>Business: {cabin_classes.business}</p>
                    <Icon icon="fxemoji:seat" hFlip={true} />
                    <p>First-Class: {cabin_classes.first}</p>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />

                <div style={{ textAlign: "center" }}>
                    <button type="button" class="btn-confirm" onClick={submitHandler}>
                        Book this Flight{" "}
                    </button>
                </div>
            </div>
        </div>
    );
}
