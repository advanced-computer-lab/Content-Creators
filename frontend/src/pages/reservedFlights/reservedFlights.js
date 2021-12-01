import React from "react";
import "../../App.css";
import { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button/Button";

export default function FlightCard({ data, setDataParent }) {
    const getReservationAxios = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/all-reservations`, /* Send username in the body */
            );
            setDataParent(response.data[0])
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        getReservationAxios();
    }, []);


    const history = useHistory();

        
    const routeChange = (path) => {
        history.push(path);
    };

    // return (
    //     {data.map((data) => {
    //         return (
    //             <div></div>
    //         );
    //     })}
    // )
}