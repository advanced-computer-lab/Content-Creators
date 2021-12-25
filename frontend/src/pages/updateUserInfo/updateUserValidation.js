import React from "react";
import "./updateUserInfo";

function updateUserValidation(newUser) {
    let errors = {};

    const {
        username,
        password,
        confirmPassword,
        first_name,
        last_name,
        address,
        countryCode,
        telephone,
        email,
        passport_number,
    } = newUser;
    if(countryCode){
    const x = Number(countryCode);
        if (isNaN(x)) {
            errors.country_code = "Country Code is not a number!";
        }
    }
    if(telephone){
    const y = Number(telephone);
        if (isNaN(y)) {
            errors.telephone = "Telephone is not a number!";
        }
    }
    if (password.length < 8 && password) {
        errors.password = "Password must be more than 8 characters.";
    }
    if(confirmPassword && confirmPassword !== password){

        errors.confirmPassword = "must be the same as the password";

    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid.";
    }

    return errors;
}

export default updateUserValidation;