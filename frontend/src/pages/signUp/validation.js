import React from "react";
import "./SignUpForm";

function validation(user) {
    let errors = {};

    const {
        username,
        password,
        first_name,
        last_name,
        address,
        country_code,
        telephone,
        email,
        passport_number,
    } = user;

    if (!username) {
        errors.username = "Username is required.";
    }
    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 8) {
        errors.password = "Password must be more than 8 characters.";
    }
    if (!first_name) {
        errors.first_name = "First Name is required.";
    }
    if (!last_name) {
        errors.last_name = "Last Name is required.";
    }
    if (!address) {
        errors.address = "Address is required.";
    }
    if (!country_code) {
        errors.country_code = "Country Code is required.";
    } else {
        const x = Number(country_code);
        if (isNaN(x)) {
            errors.country_code = "Country Code is not a number!";
        }
    }
    if (!telephone) {
        errors.telephone = "Telephone is required.";
    } else {
        const x = Number(telephone);
        if (isNaN(x)) {
            errors.telephone = "Telephone is not a number!";
        }
    }
    if (!email) {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid.";
    }
    if (!passport_number) {
        errors.passport_number = "Passport Number is required.";
    } else {
        const x = Number(passport_number);
        if (isNaN(x)) {
            errors.passport_number = "Passport Number is not a number!";
        }
    }

    return errors;
}

export default validation;
