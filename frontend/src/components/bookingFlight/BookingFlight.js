import React, { Component, useState } from "react";
import axios from "axios";
import "../../App.css";
import "./BookingFlight.css";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Flatpickr from "react-flatpickr";

export default function BookingFlight() {
    return (
        <div>
            <h1>FLIGHT_1</h1>
            <h1>FLIGHT_2</h1>
            <h1>FLIGHT_3</h1>
            <h1>FLIGHT_4</h1>
            <h1>FLIGHT_5</h1>
        </div>
    );
}
