const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },
        departure_reservation_id: {
            type: mongoose.Schema.ObjectId,
            ref: "reservations",
        },
        return_reservation_id: {
            type: mongoose.Schema.ObjectId,
            ref: "reservations",
        },
    },
    { collection: "trips" }
);
// tripSchema.index(
//     { username: 1, departure_reservation: 1, return_reservation: 1 },
//     { unique: true }
// );
const trips = mongoose.model("trips", tripSchema);

module.exports = trips;
