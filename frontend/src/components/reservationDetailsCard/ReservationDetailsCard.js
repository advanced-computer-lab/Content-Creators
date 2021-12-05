import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "./ReservationDetailsCard.css";

function ReservationDetailsCard({ tripInfo }) {
    const history = useHistory();
    console.log("history", history);
    console.log("history.booking_details", history.booking_details);
    const {
        departureFlightNumber,
        returnFlightNumber,
        departureSeats,
        returnSeats,
        cabinClass,
        requestedSeats,
    } = tripInfo;
    const [departureFlightData, setDepartureFlightData] = useState({});
    const [returnFlightData, setReturnFlightData] = useState({});

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
        getFlight(departureFlightNumber, true);
        getFlight(returnFlightNumber, false);
    }, []);

    return (
        <div>
            <h1>Cabin Class: {cabinClass}</h1>
            <h1>Requested Seats: {requestedSeats}</h1>

            <h1>Departure Flight</h1>
            <h1>Departure Flight ID: {departureFlightData._id}</h1>
            <h2>Flight Number: {departureFlightData.flight_number}</h2>
            <h2>Date: {departureFlightData.trip_date}</h2>
            <h2>Price: {departureFlightData.price}</h2>
            <h2>Baggage: {departureFlightData.baggage_allowance}</h2>
            <h2>Departure Seats:</h2>
            {departureSeats.map((seat) => {
                return <h2 key={seat}>{seat}</h2>;
            })}

            <h1>Return Flight</h1>
            <h1>Return Flight ID: {returnFlightData._id}</h1>
            <h2>Flight Number: {returnFlightData.flight_number}</h2>
            <h2>Date: {returnFlightData.trip_date}</h2>
            <h2>Price: {returnFlightData.price}</h2>
            <h2>Baggage: {returnFlightData.baggage_allowance}</h2>
            <h2>Return Seats:</h2>
            {returnSeats.map((seat) => {
                return <h2 key={seat}>{seat}</h2>;
            })}

            <h1> Departure Flight Number: {tripInfo.departure_flight_number}</h1>
            <h1> Return Flight Number: {tripInfo.return_flight_number}</h1>

            <div className="reservationDetailsCard">
                <div className="reservationDetailsCard-body">
                    <div className="reservationDetailsCard-header">
                        <h3> Hi Ahmed Mohamed,</h3>
                        <br />
                        <p>
                            Your reservation request for flight CAI-LAX roundtrip is almost
                            done!
                            <br /> Please review the details of your booking.
                        </p>
                    </div>
                    <br />
                    <div className="reservationDetailsCard-details">
                        <p>Cabin class: FirstClass</p>
                        <br />
                        <p>Number of Adults: 3</p>
                        <br />
                        <p>Number of Children: 0</p>
                        <br />
                        <p>Seat Numbers: 2A,3B,3C</p>
                    </div>
                    <div className="reservationDetailsCard-payment">
                        <br />
                        <p>Total Price: 4380</p>
                        <button
                            className="createbutton"
                            type="submit"
                            value="Create"
                        //onClick={handleSubmit}
                        >
                            Confirm Reservation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationDetailsCard;
