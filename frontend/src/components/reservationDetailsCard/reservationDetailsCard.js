import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

import "./reservationDetailsCard.css";

function reservationDetailsCard() {

    // let location = useLocation();
    // const history = useHistory();

    // const [data, setData] = useState([]);
    // //const flightNumber = location.pathname.split("/").at(-1);

    // const getReservationAxios = async () => {
    //     try {
    //         const response = await axios.get(
    //             //`http://localhost:8000/flights/search?flight_number=${flightNumber}`
    //         );
    //         setData(response.data[0]);
    //         const {
    //             flight_number,
    //             cabin_class,
    //             no_of_adults,
    //             no_of_children,
    //             seat_numbers,
    //             total_price,
    //         } = response.data[0];

    //         // const originalFlight = {
    //         //     flight_number: flight_number,
    //         //     trip_date: trip_date,
    //         //     price: price,
    //         //     baggage_allowance: baggage_allowance,
    //         // };
    //         // setFlight(originalFlight);
    //         // setTripTime(trip_time);
    //         // setCabinClasses(cabin_classes);
    //         // setAirport(airport);
    //         // console.log("Data is: ", data);
    //         // console.log("Response Data is: ", response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     getReservationAxios();
    // }, []);

    // const [flight, setFlight] = useState("");
    // const [tripTime, setTripTime] = useState("");
    // const [cabinClasses, setCabinClasses] = useState("");
    // const [airport, setAirport] = useState("");

    // const handleChangeFlight = (e) => {
    //     if (typeof e.target === "object") {
    //         const name = e.target.name;
    //         const value = e.target.value;
    //         setFlight({ ...flight, [name]: value });
    //     } else {
    //         setFlight({
    //             ...flight,
    //             ["trip_date"]: new Date(e).toISOString().slice(0, 10),
    //         });
    //     }
    // };

    // const handleChangeTripTime = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setTripTime({ ...tripTime, [name]: value });
    // };
    // const handleChangeCabinClasses = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setCabinClasses({ ...cabinClasses, [name]: value });
    // };
    // const handleChangeAirport = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setAirport({ ...airport, [name]: value });
    // };
    // const cancel = (e) => {
    //     window.location.replace("../flights");
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const nonEmpty =
    //         (flight.flight_number && tripTime.departure_time) ||
    //         tripTime.arrival_time ||
    //         flight.trip_date ||
    //         cabinClasses.economy ||
    //         cabinClasses.business ||
    //         cabinClasses.First ||
    //         airport.from ||
    //         airport.to ||
    //         flight.price;

    //     if (nonEmpty) {
    //         console.log("Data fully submitted!!");

    //         const fullFlight = {
    //             flights: {
    //                 ...flight,
    //                 trip_time: tripTime,
    //                 cabin_classes: cabinClasses,
    //                 airport: airport,
    //             },
    //         };
    //         createFlightAxios(fullFlight);
    //     } else {
    //         console.log("Not entire form is filled");
    //     }
    // };

    // const getReservationAxios = async (readyFlight) => {
    //     try {
    //         const response = await axios.put(
    //             `http://localhost:8000/flights/update-flight/${readyFlight.flights.flight_number}`,
    //             readyFlight
    //         );
    //         console.log(response);
    //         if (response.data.success == true) {
    //             console.log(
    //                 `successfully updated flight with flightnumber ${readyFlight.flights.flight_number}!`
    //             );
    //             history.push("/flights");
    //             //change route to flights
    //         } else {
    //             console.log("not able to update flight!");
    //         }
    //     } catch (err) {
    //         console.log("error occured while posting the flight using axios!");
    //         console.log(err);
    //     }
    // };

    return (
        <div>
            <div className="reservationDetailsCard">
                <div className="reservationDetailsCard-body">
                    <div className="reservationDetailsCard-header">
                        <h3> Hi Ahmed Mohamed,</h3>
                        <p>Your reservation request for flight CAI-LAX roundtrip is almost done! Please review the details of your booking.</p>
                    </div>
                    <div className="reservationDetailsCard-details">
                      <p>Cabin class: FirstClass</p>
                      <p>Number of Adults: 3</p>
                      <p>Number of Children: 0</p>
                      <p>Seat Numbers: 2A,3B,3C</p>
                    </div>
                    <div className="reservationDetailsCard-payment">
                    <p>Total Price: 4380</p>
                    <button
                                className="paymentConfirm"
                                type="button"
                                //onClick={() => editHandler(data)}
                            >
                                Confirm Reservation
                            </button>
                    </div>    
                </div>
            </div>      
        </div>
    )
}

export default reservationDetailsCard





// {data.map((data) => {
//     return (
//         <div key={data.flight_number} className="reservationDetailsCard">
//             <link
//                 href="https://fonts.googleapis.com/icon?family=Material+Icons"
//                 rel="stylesheet"
//             />
//             <div className="reservationDetailsCard-body">
//                 {" "}
//                 <h2>Reservation Details</h2>
//                 <h3>Flight Number: 123123 </h3>
//                 <div className="col1">
//                     <h5> Cabin class: FirstClass</h5>
//                     {/* <p>Departure: {data.trip_time.departure_time}</p>
//                     <p>Arrival: {data.trip_time.arrival_time}</p>
//                     <p>Date: {data.trip_date}</p> */}
//                 </div>
//                 <div className="col1">
//                     <h5>Number of Adults: 3</h5>
//                     {/* <p>Economy: {data.cabin_classes.economy}</p>
//                     <p>Business: {data.cabin_classes.business}</p>
//                     <p>First-Class: {data.cabin_classes.first}</p> */}
//                 </div>
//                 <div className="col1">
//                     <h5>Number of Children: 0</h5>
//                     {/* <p>From: {data.airport.from}</p>
//                     <p>To: {data.airport.to}</p> */}
//                 </div>
//                 <div className="col1">
//                     <p>Seat Numbers: 2A,3B,3C</p>
//                 </div>
//                 <div className="col2">
//                     <p> Total Price: 4380 </p>
//                 </div>
//             </div>
//         </div>
//     );
// })}