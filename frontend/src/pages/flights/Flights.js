import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FlightCard from "../../components/flightCard/FlightCard";
import "./Flights.css";
import "../../components/searchFilter/SearchFilter.css";
import SearchFilter from "../../components/searchFilter/SearchFilter";
import SearchBar from "../../components/searchBar/SearchBar";

export default function Flights() {
    const [data, setData] = useState([]);
    const [advancedSearch, setAdvancedSearch] = useState(false);

    const getAllFlights = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/flights/all-flights"
            );
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllFlights();
    }, []);

    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    };
    const createFlightbutton = (e) => {
        routeChange(`../create-flight`);
    };
    const toggleAdvancedSearch = () => {
        setAdvancedSearch((prevState) => !prevState);
    };

    return (
        <div>
            <div className="searching">
                <SearchBar data={data} setDataParent={setData} />
                <button
                    className="advancedSearch"
                    type="button"
                    onClick={() => toggleAdvancedSearch()}
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
                Create Flight <i class="material-icons"></i>
            </button>
            <FlightCard data={data} setDataParent={setData} />
        </div>
    );
}
