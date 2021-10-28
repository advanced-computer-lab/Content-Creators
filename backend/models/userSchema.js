const express = require("express");
const mongoose = require("mongoose");

const { validator } = require("mongoose-validator");
const flight = require("./flightSchema");
const Schema = mongoose.Schema;

/**
 * User information:
 * Username : required strings
 * passowrd: required strings to be encrypted later; min length of a password is 8
 * Name: consists of First_name and Last_name separated.
 * Address: Home_address and Country_code separated
 * Telephone: default:0 ; a telephone number min length is 11 could add more than one number.
 * Email: with validations email
 * passport: string
 * isActive: boolean default false to indicate if this is the active user
 * isAdmin: boolean default false to indicate if this is the admin user
 * reserved_Flights: an array of flights that are reserved by this user; Type of data is Flights.
 * /
 * /* */
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      trim: true,
      required: true,
    },
    Name: {
      First_name: {
        type: String,
        required: true,
      },
      Last_name: {
        type: String,
        required: true,
      },
    },
    Address: {
      Home_address: {
        type: String,
        required: true,
      },
      Country_code: {
        type: Number,
        required: true,
      },
    },
    Telephone: [
      {
        type: Number,
        required: true,
        minlength: 11,
        default: 0,
      },
    ],
    Email: {
      type: String,
      lowercase: true,
      trim: true,
      // //produces some errors (reconsider)
      // validate: [ //
      //     validator({
      //         validator: 'isEmail',
      //         message: 'Oops..please enter valid email'
      //     })]
    },
    passport: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // //produces some errors (reconsider)
    //reserved_Flights: [{
    //    //FLIGHT TYPE if this works though lol
    //    type: flight,
    //    default: null //i guess ?
    //}]
  },
  { collection: "users" }
); //supposed to be in the collection made already.

//Creating User
const User = mongoose.model("User", userSchema);

// Exporting the Users

module.exports = User;
