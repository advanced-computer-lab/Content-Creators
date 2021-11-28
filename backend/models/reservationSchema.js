const express = require("express");
const mongoose = require("mongoose");

const { validator } = require("mongoose-validator");
const flight = require("./flightSchema");
const Schema = mongoose.Schema;



const reservationSchema = new Schema(
    {
        Booking_id : {
            type: Number,
            trim: true,
            required: true,
            unique: true,
        },
        username : {
            type : String,
            trim: true,
            required: true,
        },
        flight_number : {
            type : String,
            trim: true,
            required: true,
        },
        cabinClass : {
            type : String,
            required: true,
            trim: true,
        },
        no_of_Adults : {
            type : Number,
            required: true,
        },
        no_of_Children : {
            type : Number,
            required: true,
        },
        seat_numbers : [
            {
            type : String,
            required: true,
            }
        ],
        total_price : {
            type : Number,
            required: true,
        },
    },
    { collection: "reservations" }
    );
const Reservation = mongoose.model("reservations", reservationSchema);

module.exports = Reservation;
