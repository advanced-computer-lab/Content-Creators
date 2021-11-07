import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FlightCard from "../FlightCard";
import "../Flights.css";
import "../search_bar/SearchFilter.css";
import SearchFilter from "../search_bar/SearchFilter";

export default function Flights() {
    const history = useHistory();

    const [advancedSearch, setAdvancedSearch] = useState(false);

    const routeChange = (path) => {
        history.push(path);
    };
    const createFlightbutton = (e) => {
        routeChange(`../create-flight`);
    };
    return (
        <div>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />

            <input
                className="form-control"
                type="search"
                placeholder="Search by flight number..."
            />
            <button className="searchButton" type="button">
                <i class="fa fa-search"></i>
            </button>
            <button
                type="button"
                onClick={() => {
                    setAdvancedSearch((prevState) => !prevState);
                }}
            >
                Advanced Search
      </button>

            {advancedSearch && <SearchFilter />}

            <br />
            <button
                className="createButtonViewall"
                type="button"
                onClick={createFlightbutton}
            >
                Create Flight <i class="material-icons">create_new_folder</i>
            </button>
            <FlightCard />
        </div>
    );
}
