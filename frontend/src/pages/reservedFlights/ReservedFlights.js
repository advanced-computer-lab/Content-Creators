import React from "react";
import "./ReservedFlights.css";
import "../../App.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import ReservedFlightCard from "../../components/reservedFlights/reservedFlightsCard";

export default function ReservedFlight() {
    const [username, setUsername] = useState("husseljo");

    // const [data, setData] = useState([[]]);
    const [data, setData] = useState([
        {
            flight_number: "ABC-123",
            return_reservation_id: {
                no_of_adults: 9,
                no_of_children: 7,
                no_of_adults: 2,
                no_of_children: 3,
                flight_id: {
                    flightNumber: 1,
                    price: 1,
                    baggage_allowance: 1,
                    trip_date: "11-11-2011",
                    trip_time: { arrival_time: "1:00", departure_time: "2:00" },
                    airport: { from: "", to: "" },
                },
            },
            departure_reservation_id: {
                no_of_adults: 9,
                no_of_children: 7,
                no_of_adults: 2,
                no_of_children: 3,
                flight_id: {
                    flightNumber: 1,
                    price: 1,
                    baggage_allowance: 1,
                    trip_date: "11-11-2011",
                    trip_time: { arrival_time: "1:00", departure_time: "2:00" },
                    airport: { from: "", to: "" },
                },
            },
        },
    ]);

    const getReservationAxios = async () => {
        try {
            const response = await axios.get("http://localhost:8000/trips/all-trips");
            setData(response.data);
            setUsername(response.data[0].username);
        } catch (err) {
            console.log(err);
        }
    };
    console.log("DATA IS: ", data);

    useEffect(() => {
        getReservationAxios();
    }, []);

    // const deleteHandler = async () => {
    //     let isExecuted = window.confirm("Are you sure to delete this flight?");
    //     if (isExecuted) {
    //         try {
    //             console.log(`Attempting to delete flightNumber: ${flightNumber}`);
    //             const response = await axios.delete(
    //                 `http://localhost:8000/flights/delete-flight/${flightNumber}`
    //             );
    //             setDataParent((prevState) => {
    //                 return prevState.filter((elem) => elem.flight_number != flightNumber);
    //             });
    //             console.log(`successfully deleted ${flightNumber}`);
    //         } catch (err) {
    //             console.log(`not able to delete ${flightNumber}`);
    //             console.log(err);
    //         }
    //     } else {
    //         routeChange(`all-flights`);
    //     }
    // };

    const deleteHandler = async (tripId) => {
        let isExecuted = window.confirm("Are you sure to delete this trip?");
        if (isExecuted) {
            try {
                console.log(`Attempting to delete trip: ${tripId}`);
                const response = await axios.delete(
                    `http://localhost:8000/trips/delete-trip/${tripId}`
                );
            } catch (err) {
                console.log(`not able to delete trip ${tripId}`);
                console.log(err);
            }
        }
    };

    return (
        <div>
            {data.map((data, index) => {
                {
                    /* <div> User of this trip: {data.username}</div>; */
                }
                console.log(`data ${index}`, data);
                return (
                    <div styles={{ alignContent: "center" }}>
                        <br />
                        <br />
                        <h1>Trip {index + 1}</h1>
                        <button
                            className="FlightBtns"
                            id={data._id}
                            type="button"
                            onClick={() => deleteHandler(data._id)}
                        >
                            Cancel Trip
                        </button>

                        <h2>
                            <Icon icon="tabler:brand-booking" />
                            Trip ID: {data._id}
                        </h2>
                        <h2>
                            <Icon icon="tabler:brand-booking" />
                            Cabin Class: {data.departure_reservation_id.cabin_class}
                        </h2>
                        <h2>
                            <Icon icon="el:adult" />
                            Number of Adults: {data.departure_reservation_id.no_of_adults}
                        </h2>
                        <h2>
                            <Icon icon="mdi:human-male-child" />
                            Number of Children: {data.departure_reservation_id.no_of_children}
                        </h2>
                        <h1>
                            {" "}
                            Departure Flight:{" "}
                            {data.departure_reservation_id.flight_id.flight_number}
                        </h1>
                        <ReservedFlightCard
                            data={data.departure_reservation_id.flight_id}
                        />
                        <h1>
                            {" "}
                            Return Flight:{" "}
                            {data.return_reservation_id.flight_id.flight_number}
                        </h1>
                        <ReservedFlightCard data={data.return_reservation_id.flight_id} />
                    </div>
                );
            })}
        </div>
    );
}
