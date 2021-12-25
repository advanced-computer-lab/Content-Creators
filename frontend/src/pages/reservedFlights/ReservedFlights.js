import React from "react";
import "./ReservedFlights.css";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import ReservedFlightCard from "../../components/reservedFlights/reservedFlightsCard";

export default function ReservedFlight() {
    const history = useHistory();
    const [data, setData] = useState([]);
    console.log("history.newReturnFlight", history.newReturnFlight);

    // console.log(data, "TRIP DATA");
    const getReservationAxios = async () => {
        try {
            const response = await axios.get("http://localhost:8000/trips/all-trips");
            setData(response.data);
            console.log("ReservedFlight DATA IS:  ", response.data);
        } catch (err) {
            console.log(err);
        }
    };
    console.log("DATA IS: ", data);
    useEffect(() => {
        getReservationAxios();
    }, []);

    const deleteHandler = async (tripId) => {
        let isExecuted = window.confirm("Are you sure to delete this trip?");
        if (isExecuted) {
            try {
                console.log(`Attempting to delete trip: ${tripId}`);
                const response = await axios.delete(
                    `http://localhost:8000/trips/delete-trip/${tripId}`
                );
                setData((prevState) => {
                    return prevState.filter((elem) => elem._id != tripId);
                });
            } catch (err) {
                console.log(`not able to delete trip ${tripId}`);
                console.log(err);
            }
        }
    };

    const changeSeatHandler = (e, flightNumber, allSeats, chosenSeats) => {
        const reservationId = e.target.id;
        const changeSeatInfo = {
            flightNumber,
            reservationId,
            allSeats,
            chosenSeats,
        };
        history.changeSeatInfo = changeSeatInfo;
        history.push("/change-seats");
    };

    const pickNewHandler = (e) => {
        const newFlightInfo = {
            tripId: "wfe",
            reservationId: "wfe",
            from: "MUC",
            to: "CAI",
        };
        history.newFlightInfo = newFlightInfo;
        history.push("/change-reservation");
    };

    if (data.length == 0) {
        return <h1></h1>;
    } else {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Trip Number</th>
                            <th>Reservation ID</th>
                            <th>Flight Number</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Departure/Return</th>
                            <th>Cabin Class</th>
                            <th>Trip Date</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Change Seats</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length ? (
                            data.map((data, index) => (
                                <>
                                    <tr>
                                        <td>
                                            <button
                                                className="FlightBtns"
                                                id={data._id}
                                                type="button"
                                                onClick={() => deleteHandler(data._id)}
                                            >
                                                Cancel Trip {index + 1}
                                            </button>
                                        </td>
                                        <td>{data.username}</td>
                                        <td>{data._id}</td>
                                    </tr>
                                    <tr key={data._id}>
                                        <td>{index + 1}</td>
                                        <td>{data.departure_reservation_id?._id}</td>
                                        <td>
                                            {data.departure_reservation_id?.flight_id?.flight_number}
                                        </td>
                                        <td>
                                            {data.departure_reservation_id?.flight_id?.airport?.from}
                                        </td>
                                        <td>
                                            {data.departure_reservation_id?.flight_id?.airport?.to}
                                        </td>
                                        <td>Departure</td>
                                        <td>{data.departure_reservation_id?.cabin_class}</td>
                                        <td>
                                            {data.departure_reservation_id?.flight_id?.trip_date}
                                        </td>
                                        <td>
                                            {
                                                data.departure_reservation_id?.flight_id?.trip_time
                                                    ?.departure_time
                                            }
                                        </td>
                                        <td>
                                            {
                                                data.departure_reservation_id?.flight_id?.trip_time
                                                    ?.arrival_time
                                            }
                                        </td>

                                        <button
                                            className="FlightBtns"
                                            id={data.departure_reservation_id?._id}
                                            type="button"
                                            onClick={(e) => {
                                                const cabinClass =
                                                    data.departure_reservation_id?.cabin_class;
                                                const allSeats =
                                                    data.departure_reservation_id?.flight_id?.seats[
                                                    cabinClass
                                                    ];
                                                const chosenSeats =
                                                    data.departure_reservation_id?.seat_numbers;
                                                const flightNumber =
                                                    data.departure_reservation_id?.flight_id
                                                        ?.flight_number;
                                                changeSeatHandler(
                                                    e,
                                                    flightNumber,
                                                    allSeats,
                                                    chosenSeats
                                                );
                                            }}
                                        >
                                            Change Seats
                                        </button>
                                        <td>
                                            <button
                                                className="FlightBtns"
                                                id={data.departure_reservation_id?._id}
                                                type="button"
                                                onClick={() => {
                                                    const { to, from } =
                                                        data.departure_reservation_id?.flight_id?.airport;
                                                    const {
                                                        username,
                                                        no_of_adults,
                                                        no_of_children,
                                                        total_price,
                                                    } = data.departure_reservation_id;
                                                    const newReservation = {
                                                        tripId: data?._id,
                                                        reservationId: data?.departure_reservation_id?._id,
                                                        cabinClass:
                                                            data?.departure_reservation_id?.cabin_class,
                                                        requestedSeats:
                                                            data?.departure_reservation_id?.seat_numbers
                                                                ?.length,
                                                        from,
                                                        to,
                                                        username,
                                                        no_of_adults,
                                                        no_of_children,
                                                        total_price,
                                                        flight_type: "departure",
                                                    };
                                                    console.log("newReservation", newReservation);
                                                    history.newReservation = newReservation;
                                                    history.push("/change-reservation");
                                                }}
                                            >
                                                Pick new flight
                                            </button>
                                        </td>
                                    </tr>

                                    <tr key={data._id}>
                                        <td>{index + 1}</td>
                                        <td>{data.return_reservation_id?._id}</td>
                                        <td>
                                            {data.return_reservation_id?.flight_id?.flight_number}
                                        </td>
                                        <td>
                                            {data.return_reservation_id?.flight_id?.airport?.from}
                                        </td>
                                        <td>
                                            {data.return_reservation_id?.flight_id?.airport?.to}
                                        </td>
                                        <td>Return</td>
                                        <td>{data.return_reservation_id?.cabin_class}</td>
                                        <td>{data.return_reservation_id?.flight_id?.trip_date}</td>
                                        <td>
                                            {
                                                data.return_reservation_id?.flight_id.trip_time
                                                    ?.departure_time
                                            }
                                        </td>
                                        <td>
                                            {
                                                data.return_reservation_id?.flight_id?.trip_time
                                                    ?.arrival_time
                                            }
                                        </td>
                                        <button
                                            className="FlightBtns"
                                            id={data.return_reservation_id?._id}
                                            type="button"
                                            onClick={(e) => {
                                                const cabinClass =
                                                    data.return_reservation_id?.cabin_class;
                                                const allSeats =
                                                    data.return_reservation_id?.flight_id?.seats[
                                                    cabinClass
                                                    ];
                                                const chosenSeats =
                                                    data.return_reservation_id?.seat_numbers;
                                                const flightNumber =
                                                    data.return_reservation_id?.flight_id?.flight_number;
                                                changeSeatHandler(
                                                    e,
                                                    flightNumber,
                                                    allSeats,
                                                    chosenSeats
                                                );
                                            }}
                                        >
                                            Change Seats
                                        </button>
                                        <td>
                                            <button
                                                className="FlightBtns"
                                                id={data.return_reservation_id?._id}
                                                type="button"
                                                onClick={() => {
                                                    const { to, from } =
                                                        data.return_reservation_id?.flight_id?.airport;
                                                    const {
                                                        username,
                                                        no_of_adults,
                                                        no_of_children,
                                                        total_price,
                                                    } = data.return_reservation_id;
                                                    const newReservation = {
                                                        tripId: data?._id,
                                                        reservationId: data?.return_reservation_id?._id,
                                                        cabinClass:
                                                            data?.return_reservation_id?.cabin_class,
                                                        requestedSeats:
                                                            data?.return_reservation_id?.seat_numbers?.length,
                                                        from,
                                                        to,
                                                        username,
                                                        no_of_adults,
                                                        no_of_children,
                                                        total_price,
                                                        flight_type: "return",
                                                    };
                                                    console.log("newReservation", newReservation);
                                                    history.newReservation = newReservation;
                                                    history.push("/change-reservation");
                                                }}
                                            >
                                                Pick new flight
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={11}>-</td>
                                    </tr>
                                </>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No flights found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
