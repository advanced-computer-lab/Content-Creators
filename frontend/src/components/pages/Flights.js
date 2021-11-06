import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import axios from "axios";
import FlightCard from "../FlightCard";
import "../Flights.css";
import { Link } from "react-router-dom";

  

export default function Flights() {
    
   
    return (
        <div>
            <input className="searchBar" type="text" placeholder="Search.." />
            <Link className="createButton" type="button" to="/create-flight">Create Flight</Link>
            <FlightCard />
        </div>
    );

}
