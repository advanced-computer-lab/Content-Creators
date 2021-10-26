import mongoose from 'mongoose';
import express from 'express';

const Schema = mongoose.Schema;
/** 
 * Flights information:
 * flight number as a string.
 * trip_time as a combined time {departure_time and arrival_time} both strings.
 * trip_date as a date.
 * seat_number as a combined seat (economy, business, first) all Numbers.
 * airport as a combined airport (from, to) all strings.
 * 
 * /
 * /* */
const flightsSchema = new Schema({
    flight_number: {
        type: String,
        required: true,
        unique: true
    },
    trip_time: {
        departure_time: {
            type: String,
            required: true
        },
        arrival_time: {
            type: String,
            required: true
        }
    },
    trip_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    seat_number: {
        economy: {
            type: Number,
            required: true,
            default:0
        },
        business: {
            type: Number,
            required: true,
            default:0
        },
        First: {
            type: Number,
            required: true,
            default:0
        }
    },
    airport: {
        from:{type: String, required: true},
        to:{type: String, required: true}
    }
})

//Creating flights
const Flights = mongoose.model('Flight', flightsSchema);


// Exporting the flightsSchema

module.exports = Flights;