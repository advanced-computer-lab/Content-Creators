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

    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    };

    const submitHandler = (flightNumber) => {
        routeChange(`../reservation-details`);
    };

    // return (
    //     <div>
    //         <div> User of this trip: {username}</div>
    //         {data.map((data) => {
    //             return (
    //                 <div styles={{ alignContent: "center" }}>
    // <ReservedFlightCard data={data.departure_reservation_id} />
    // <ReservedFlightCard data={data.return_reservation_id} />
    //                 </div>
    //             );
    //         })}
    //     </div>
    // );
    // }
    return (
        <div>
            <div> User of this trip: {username}</div>
            {data.map((data, index) => {
                console.log(`data ${index}`, data);
                return (
                    <div styles={{ alignContent: "center" }}>
                        <br />
                        <br />
                        <h1>Trip {index + 1}</h1>
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
