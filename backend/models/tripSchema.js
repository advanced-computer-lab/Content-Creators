const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let counter = 0;

const tripSchema = new Schema(
    {
        trip_id: {
            type: Number,
            trim: true,
            unique: true,
            default: () => counter++,
        },
        username: {
            type: String,
            trim: true,
            required: true,
        },
        arrival_flight_number: {
            type: String,
            trim: true,
            required: true,
        },
        departure_flight_number: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { collection: "trips" }
);
tripSchema.index(
    { username: 1, arrival_flight_number: 1, departure_flight_number: 1 },
    { unique: true }
);
const trips = mongoose.model("trips", tripSchema);

module.exports = trips;
