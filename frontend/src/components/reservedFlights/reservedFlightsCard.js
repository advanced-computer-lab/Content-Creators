import React from "react";
import "./reservedFlightsCard.css";
import "../../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

export default function ReservedFlightCard({ data }) {
    console.log("PASSED PROPS", data);
    console.log("data.airport", data.airport);

    // { airport, trip_date, trip_time }
    // let { airport, trip_date, trip_time } = data;

    if (data.airport) {
        return (
            <div>
                <div styles={{ alignContent: "center" }}>
                    <div className="flightReservationsCard">
                        <h2>
                            <Icon
                                icon="icon-park-outline:round-trip"
                                color="#111"
                                width="24"
                                height="24"
                            />
                            FROM: {data.airport.from} TO: {data.airport.to}
                        </h2>
                        <h2></h2>
                        <h2></h2>
                        <h2></h2>

                        <h2>
                            <Icon
                                icon="icon-park-outline:calender-thirty"
                                color="#111"
                                width="24"
                                height="24"
                            />
                            TRIP DATE: {data.trip_date}
                        </h2>
                        <h2></h2>
                        <h2></h2>
                        <h2></h2>
                        <h2>
                            <Icon
                                icon="icon-park-outline:calender-thirty"
                                color="#111"
                                width="24"
                                height="24"
                            />
                            DEPARTURE: {data.trip_time.departure_time}
                        </h2>
                        <h2></h2>
                        <h2></h2>
                        <h2></h2>
                        <h2>
                            <Icon
                                icon="icon-park-outline:calender-thirty"
                                color="#111"
                                width="24"
                                height="24"
                            />
                            ARRIVAL: {data.trip_time.arrival_time}
                        </h2>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
}
