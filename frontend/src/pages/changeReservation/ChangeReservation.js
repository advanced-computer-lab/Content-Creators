import React from "react";
import "../../App.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ChangeReservation.css";
import AvailableFlights from "../../components/availableFlights/AvailableFlights";

export default function ChangeReservation() {
    const history = useHistory();
    let tripId,
        reservationId,
        to,
        from,
        cabinClass,
        requestedSeats,
        username,
        no_of_adults,
        no_of_children,
        total_price,
        flight_type;
    if (history.newReservation) {
        ({
            tripId,
            reservationId,
            to,
            from,
            cabinClass,
            requestedSeats,
            username,
            no_of_adults,
            no_of_children,
            total_price,
            flight_type,
        } = history.newReservation);
        console.log("history.newReservation ISSSS: ", history.newReservation);
    }
    const [flights, setFlights] = useState([]);

    const getAllFlights = async () => {
        try {
            const url = `http://localhost:8000/flights/all-flights`;
            const response = await axios.get(url);
            setFlights(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        console.log("history.newReservation", history.newReservation);
        getAllFlights();
    }, []);

    const changeReservationAxios = async (newReservation) => {
        try {
            const url = `http://localhost:8000/trips/change-reservation/`;
            const response = await axios.post(url, newReservation);
        } catch (err) {
            console.log(err);
        }
    };

    const confirmHandler = () => {
        if (flights.length == 1) {
            const newReservation = {
                flightNumber: flights[0].flight_number,
                flightId: flights[0]._id,
                tripId,
                reservationId,
                cabinClass,
                requestedSeats,
                username,
                no_of_adults,
                no_of_children,
                total_price,
                flight_type,
            };
            history.newReservation = newReservation;
            history.push("seat-picker-change");
        }
    };
    if (history.newReservation) {
        return (
            <div>
                <AvailableFlights
                    flights={flights}
                    setFlights={setFlights}
                    renewFlights={getAllFlights}
                />
                <br />
                <div style={{ textAlign: "center" }}>
                    <button type="button" class="btn-confirm" onClick={confirmHandler}>
                        Choose your Seats
                    </button>
                </div>
            </div>
        );
    } else {
        history.push("/reserved-flights");
        return <></>;
    }
}
