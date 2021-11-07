import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import axios from "axios";
import FlightCard from "../FlightCard";
import "../Flights.css";


;


export default function Flights() {
const history = useHistory();

const routeChange = (path) =>{ 
    
    history.push(path);
  }
const createFlightbutton = (e) => {
    routeChange(`../create-flight`);

  };
//   const emptyFlight = {
//     flight_number: "",
//     trip_date: "",
//     price: "",
//     economy: "",
//     business: "",
//     First: "",
//     departure_time: "",
//     arrival_time: "",
//     from: "", 
//     to: "", 
// };
// const [flight, setFlight] = useState(emptyFlight);
  
// const onChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setFlight({ ...flight, [name]: value });

//   };
//   const onSubmit = (e) => {

//     // e.preventDefault();
//     const nonEmpty =
//         flight.flight_number &&
//         flight.departure_time ||
//         flight.arrival_time ||
//         flight.trip_date ||
//         flight.economy ||
//         flight.business ||
//         flight.First ||
//         flight.from ||
//         flight.to ||
//         flight.price;

//     if (nonEmpty) {
//         console.log("Data fully submitted!!");

//         const fullFlight = {
//             flights: {
//                 ...flight,

//             },
//         };
//         createFlightAxios(fullFlight);

//         setFlight(emptyFlight);
//   };
//   };
//   const [data, setData] = useState([]);
//   const createFlightAxios = async (readyFlight) => {
//     try {
//         const response = await axios.get(
//             `http://localhost:8000/flights/all-flights`,
//             readyFlight
//         )
//         .then((res) => {
//             setData(res.data);
//         })
//     }catch(err)  {
//             console.log(err);
//             console.log("error");
//         }

// };
   
    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

            <input className="form-control" type="search" placeholder="Search ..."  />
            <button className="searchButton" type="button" ><i class="fa fa-search"></i></button>
            <br />
            <button className="createButtonViewall" type="button" onClick={createFlightbutton}>Create Flight <i class="material-icons">create_new_folder</i></button>
            <FlightCard />
        </div>
    );

}
