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
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);

    const resetAllFlights = () => {
        setData(fullData);
    };

    const getAllFlights = async (callFunc) => {
        try {
            const response = await axios.get(
                "http://localhost:8000/flights/all-flights"
            );
            callFunc(response.data);
            // setData(response.data);
            // setFullData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllFlights(setData);
    }, []);

    useEffect(() => {
        // console.log("fullData is:");
        // console.log(fullData);
        console.log("PARENT:normal data is ");
        console.log(data);

        console.log("PARENT:FULL DATA is ");
        console.log(fullData);
    });

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
            <FlightCard
                data={data}
                setDataParent={setData}
                resetAllFlights={resetAllFlights}
                fullData={fullData}
            />
        </div>
    );
}
