import React, { useReducer, useState } from "react";
import "../../App.css";
import axios from "axios";
import '../CreateFlight.css';

function CreateFlight() {
    const emptyFlight = {
        flight_number: "",
        trip_date: "",
        price: "",
    };
    const emptySeatNumber = {
        economy: "",
        business: "",
        First: "",
    };
    const emptyTripTime = {
        departure_time: "",
        arrival_time: "",
    };
    const emptyAirport = { from: "", to: "" };

    const [flight, setFlight] = useState(emptyFlight);
    const [tripTime, setTripTime] = useState(emptyTripTime);
    const [seatNumber, setSeatNumber] = useState(emptySeatNumber);
    const [airport, setAirport] = useState(emptyAirport);

    const handleChangeFlight = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFlight({ ...flight, [name]: value });
    };

    const handleChangeTripTime = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTripTime({ ...tripTime, [name]: value });
    };
    const handleChangeSeatNumber = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSeatNumber({ ...seatNumber, [name]: value });
    };
    const handleChangeAirport = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAirport({ ...airport, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
            flight.flight_number &&
            tripTime.departure_time &&
            tripTime.arrival_time &&
            flight.trip_date &&
            seatNumber.economy &&
            seatNumber.business &&
            seatNumber.First &&
            airport.from &&
            airport.to &&
            flight.price;

        if (nonEmpty) {
            console.log("Data fully submitted!!");

            const fullFlight = {
                flights: {
                    ...flight,
                    trip_time: tripTime,
                    seat_number: seatNumber,
                    airport: airport,
                },
            };
            // console.log(fullFlight);
            createFlightAxios(fullFlight);

            setFlight(emptyFlight);
            setTripTime(emptyTripTime);
            setSeatNumber(emptySeatNumber);
            setAirport(emptyAirport);
        } else {
            console.log("Not entire form is filled");
        }
    };

    const createFlightAxios = async (readyFlight) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/flights/create-flight",
                readyFlight
            );
            if (response.data.success) {
                console.log(
                    `successfully created flight with flightnumber ${readyFlight.flights.flight_number}!`
                );
            } else {
                console.log("not able to create flight!");
            }
        } catch (err) {
            console.log("error occured while posting the flight using axios!");
            console.log(err);
        }
    };

    return (
        <>
        <div className="CreateFlight">
            <div action="post" className="CreateFlight form" onSubmit={handleSubmit}>
                <div className="form-control">
                        <label htmlFor="flight_number">Flight Number </label>
                        <input
                            type="text"
                            id="flight_number"
                            name="flight_number"
                            value={flight.flight_number}
                            onChange={handleChangeFlight}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="departure_time">Departure Time</label>
                        <input
                            type="text"
                            id="departure_time"
                            name="departure_time"
                            value={tripTime.departure_time}
                            onChange={handleChangeTripTime}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="arrival_time">Arrival Time : </label>
                        <input
                            type="text"
                            id="arrival_time"
                            name="arrival_time"
                            value={tripTime.arrival_time}
                            onChange={handleChangeTripTime}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="trip_date">Trip Date : </label>
                        <input
                            type="text"
                            id="trip_date"
                            name="trip_date"
                            value={flight.trip_date}
                            onChange={handleChangeFlight}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="economy">Economy : </label>
                        <input
                            type="number"
                            id="economy"
                            name="economy"
                            value={seatNumber.economy}
                            onChange={handleChangeSeatNumber}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="business">Business : </label>
                        <input
                            type="number"
                            id="business"
                            name="business"
                            value={seatNumber.business}
                            onChange={handleChangeSeatNumber}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="First">First : </label>
                        <input
                            type="number"
                            id="First"
                            name="First"
                            value={seatNumber.First}
                            onChange={handleChangeSeatNumber}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="airport_from">Airport From : </label>
                        <input
                            type="text"
                            id="airport_from"
                            name="from"
                            value={airport.from}
                            onChange={handleChangeAirport}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="airport_to">Airport To : </label>
                        <input
                            type="text"
                            id="airport_to"
                            name="to"
                            value={airport.to}
                            onChange={handleChangeAirport}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price : </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={flight.price}
                            onChange={handleChangeFlight}
                        />
                    </div>
                    <button 
                                className ="createbutton"
                                type="submit"
                                value="Create"
                                onClick={handleSubmit}
                                 >
                                   Create Flight
                                   </button>
                    </div>
        </div>
        </>
    );
}

export default CreateFlight;