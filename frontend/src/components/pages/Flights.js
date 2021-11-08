import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory ,BrowserRouter as Router,
    Link,
    useLocation } from "react-router-dom";
import axios from "axios";
import FlightCard from "../FlightCard";
import "../Flights.css";
import "../search_bar/SearchFilter.css";
import SearchFilter from "../search_bar/SearchFilter";
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
export default function Flights() {
    const history = useHistory();


      let query = useQuery();
    const [advancedSearch, setAdvancedSearch] = useState(false);

    const routeChange = (path) => {
        history.push(path);
    };
    const createFlightbutton = (e) => {
        routeChange(`../create-flight`);
    };

    const onChange = (e) =>{
        
       routeChange(`../flights?${e.target.value}`);
        
    };
    const onEnter = (e) =>{
        if(e.key == 'Enter'){
            window.location.assign(`../flights?${e.target.value}`);
            
        }
    }
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
                type="text"
                placeholder="Search by flight number..."
                onChange={onChange}
                onKeyPress={onEnter}
            />
          
            <button
                className="advancedSearch"
                type="button"
                onClick={() => {
                    setAdvancedSearch((prevState) => !prevState);
                }}
            >
                Advanced Search
      </button>

            {advancedSearch && <SearchFilter />}
            </div>

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
