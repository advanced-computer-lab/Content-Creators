import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FlightCard from "../../components/flightCard/FlightCard";
import "./Flights.css";
import "../../components/searchFilter/SearchFilter.css";
import SearchFilter from "../../components/searchFilter/SearchFilter";

export default function Flights() {
    const [data, setData] = useState([]);
    const [advancedSearch, setAdvancedSearch] = useState(false);

    const getAllFlights = async (callFunc) => {
        try {
            const response = await axios.get(
                "http://localhost:8000/flights/all-flights"
            );
            callFunc(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllFlights(setData);
    }, []);

    const history = useHistory();

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

            <div className="searching">
                <input
                    className="searchBar"
                    type="search"
                    placeholder="Search by flight number..."
                />
                <button className="searchButton" type="button">
                    <i class="fa fa-search"></i>
                </button>
                <button
                    className="advancedSearch"
                    type="button"
                    onClick={() => {
                        setAdvancedSearch((prevState) => !prevState);
                    }}
                >
                    Advanced Search
        </button>

                {advancedSearch && <SearchFilter data={data} setDataParent={setData} />}
            </div>

            <br />
            <button
                className="createButtonViewall"
                type="button"
                onClick={createFlightbutton}
            >
                Create Flight <i class="material-icons">create_new_folder</i>
            </button>
            <FlightCard data={data} setDataParent={setData} />
        </div>
    );
}
