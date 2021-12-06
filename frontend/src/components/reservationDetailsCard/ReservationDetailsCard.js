import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "./ReservationDetailsCard.css";

function ReservationDetailsCard({ tripInfo }) {
    const history = useHistory();
    const {
        departureFlightNumber,
        returnFlightNumber,
        departureSeats,
        returnSeats,
        cabinClass,
        requestedSeats,
        adultsNumber,
        childrenNumber,
    } = tripInfo;
    const [departureFlightData, setDepartureFlightData] = useState({});
    const [returnFlightData, setReturnFlightData] = useState({});
    const [username, setUsername] = useState("husseljo");

    const getFlight = async (flightNumber, bool) => {
        try {
            const url = `http://localhost:8000/flights/search?flight_number=${flightNumber}`;
            const response = await axios.get(url);
            bool
                ? setDepartureFlightData(response.data[0])
                : setReturnFlightData(response.data[0]);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (departureFlightNumber) {
            getFlight(departureFlightNumber, true);
            getFlight(returnFlightNumber, false);
        }
    }, []);

    const createTripAxios = async (readyTrip) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/trips/add-trip",
                readyTrip
            );
            if (response.data.success) {
                console.log("successfully created trip");
            } else {
                console.log("not able to create trip!");
            }
        } catch (err) {
            console.log("error occured while posting the trip using axios!");
            console.log(err);
        }
    };

    const confirmHandler = () => {
        const readyTrip = {
            trip: {
                username: username,
                cabin_class: cabinClass,
                no_of_adults: adultsNumber,
                no_of_children: childrenNumber,
                departure_flight_id: departureFlightData._id,
                departure_seat_numbers: departureSeats,
                return_flight_id: returnFlightData._id,
                return_seat_numbers: departureSeats,
                departure_total_price: departureFlightData.price,
                return_total_price: returnFlightData.price,
            },
        };
        createTripAxios(readyTrip);
        console.log("trip successfully created!");
        history.push("/");
    };

    if (departureFlightData && cabinClass) {
        return (
            <div>
                <div className="reservationDetailsCard">
                    <div className="reservationDetailsCard-body">
                        <div className="reservationDetailsCard-header">
                            <p>
                                Your reservation request for is almost done!
                                <br /> Please review the details of your booking.
                            </p>
                        </div>
                        <br />
                        <div className="reservationDetailsCard-details">
                            <p>Cabin Class: {cabinClass}</p>
                            <br />
                            <p>Requested Seats: {requestedSeats}</p>
                            <br />
                            <p>Departure Flight</p>
                            <p>Flight Number: {departureFlightData.flight_number}</p>
                            <p>Date: {departureFlightData.trip_date}</p>
                            <p>Price: {departureFlightData.price}</p>
                            <p>Baggage: {departureFlightData.baggage_allowance}</p>
                            <p>Departure Seats:</p>
                            <p>
                                {departureSeats.map((seat) => {
                                    return <p key={seat}>{seat}</p>;
                                })}
                            </p>
                            <br />
                            <br />
                            <p>Return Flight</p>
                            <p>Flight Number: {returnFlightData.flight_number}</p>
                            <p>Date: {returnFlightData.trip_date}</p>
                            <p>Price: {returnFlightData.price}</p>
                            <p>Baggage: {returnFlightData.baggage_allowance}</p>
                            <p>Return Seats:</p>
                            <p>
                                {returnSeats.map((seat) => {
                                    return <p key={seat}>{seat}</p>;
                                })}
                            </p>
                        </div>
                        <div className="reservationDetailsCard-payment">
                            <br />
                            <button
                                className="createbutton"
                                type="submit"
                                value="Create"
                                onClick={confirmHandler}
                            >
                                Confirm Reservation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>PLEASE GO THROUGH BOOKING PROCESS</h1>

                <div style={{ textAlign: "center" }}>
                    <button
                        type="button"
                        class="btn-confirm"
                        onClick={() => {
                            history.push("/booking");
                        }}
                    >
                        GO TO BOOKING
                    </button>
                </div>
            </div>
        );
    }
}

export default ReservationDetailsCard;
