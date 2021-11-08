import React from "react";
import "./SearchBar.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(`searchTerm is ${searchTerm}`);
    };
    const handleSearchTerm = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    return (
        <>
            <form onSubmit={(e) => handleSearchSubmit(e)}>
                <input
                    className="searchBar"
                    type="search"
                    placeholder="Search by flight number..."
                    name="search_bar"
                    onChange={handleSearchTerm}
                />
                <button className="searchButton" type="submit">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </>
    );
}
