const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/**
 * Flights information:
 * flight number as a string.
 * trip_time as a combined time {departure_time and arrival_time} both strings.
 * trip_date as a date.
 * seat_number as a combined seat (economy, business, first) all Numbers.
 * airport as a combined airport (from, to) all strings.
 * Number for price
 * /
 * /* */
//flights
const flightsSchema = new Schema({
    flight_number: {
        type: String,
        required: true,
        unique: true,
    },
    trip_time: {
        departure_time: {
            type: String,
            required: true,
        },
        arrival_time: {
            type: String,
            required: true,
        },
    },
    trip_date: {
        type: String,
        required: true,
    },
    cabin_classes: {
        economy: {
            type: Number,
            required: true,
            default: 0,
        },
        business: {
            type: Number,
            required: true,
            default: 0,
        },
        first: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    airport: {
        from: { type: String, required: true },
        to: { type: String, required: true },
    },
    price: {
        type: Number,
        required: true,
    },
    baggage_allowance: {
        type: Number,
        required: true,
    },
    seats: [{ seat_number: String, reserved: Boolean }],
});

//Creating flights
const Flights = mongoose.model("Flight", flightsSchema);

// Exporting the Flights

module.exports = Flights;
