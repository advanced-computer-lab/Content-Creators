import React from "react";
import "./updateUserInfo";

function updateUserValidation(newUser) {
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
    } = newUser;

    const x = Number(country_code);
        if (isNaN(x)) {
            errors.country_code = "Country Code is not a number!";
        }

    const y = Number(telephone);
        if (isNaN(x)) {
            errors.telephone = "Telephone is not a number!";
        }
        
    if (password.length < 8) {
        errors.password = "Password must be more than 8 characters.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid.";
    }

    return errors;
}

export default updateUserValidation;

