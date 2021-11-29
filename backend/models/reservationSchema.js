const express = require("express");
const mongoose = require("mongoose");

const { validator } = require("mongoose-validator");
const flight = require("./flightSchema");
const Schema = mongoose.Schema;

let counter = 0;
let CountedId = {type: Number, unique: true,default: () => counter++};

const reservationSchema = new Schema(
    {
        booking_id : 
        {
            type: Number,
            trim: true,
            // required: true,
            unique: true,
            // auto_increment: true,
            default: () => counter++,
        }
        ,
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
        cabin_class : {
            type : String,
            required: true,
            trim: true,
        },
        no_of_adults : {
            type : Number,
            required: true,
        },
        no_of_children : {
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
const reservation = mongoose.model("reservations", reservationSchema);

module.exports = reservation;
