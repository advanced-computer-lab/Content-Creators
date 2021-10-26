import mongoose from 'mongoose';
import express from 'express';
import { validator } from 'mongoose-validator';
import flight from './flightSchema';
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
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        
        type: String,
        minlength: 8,
        trim: true,
        required: true
        
    },
    Name: {
        First_name: {
            type: String,
            required: true
        },
        Last_name: {
            type: String,
            required: true
        }
    },
    Address: {
        Home_address: {
            type: String,
            required: true,
        },
        Country_code: {
            type: Number,
            required: true,
        }
    },
    Telephone:[ {
        
        type: Number,
        required: true,
        default:0
    }],
    Email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: [
          validator({
            validator: 'isEmail',
            message: 'Oops..please enter valid email'
          })]
    },
    passport: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    reserved_Flights:[{
        //FLIGHT TYPE if this works though lol
        type: flight,
        default: null //i guess ?
    }]
},{collection: users}); //supposed to be in the collection made already.

//Creating flights
const User = mongoose.model('User', userSchema);


// Exporting the flightsSchema

module.exports = User;