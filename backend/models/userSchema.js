const express = require("express");
const mongoose = require("mongoose");

const { validator } = require("mongoose-validator");
const flight = require("./flightSchema");
const Schema = mongoose.Schema;

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
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        country_code: {
            type: Number,
            required: true,
            default: 20,
        },
        telephone: {
            type: Number,
            required: true,
            minlength: 11,
            default: 0,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
            unique: true,
        },
        passport_number: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { collection: "users" }
);
const User = mongoose.model("users", userSchema);

module.exports = User;
