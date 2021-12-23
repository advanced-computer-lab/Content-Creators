import React from 'react'
import "./SignUpForm";

function validation(user) {

    let errors={};

    if(!user.username){
        errors.username="Username is required.";
    }
    if(!user.password){
        errors.password="Password is required.";
    }else if(user.password.length<8){
        errors.password="Password must be more than 8 characters.";
    }
    if(!user.first_name){
        errors.first_name="First Name is required.";
    }
    if(!user.last_name){
        errors.last_name="Last Name is required.";
    }
    if(!user.address){
        errors.address="Address is required.";
    }
    if(!user.country_code){
        errors.country_code="Country Code is required.";
    }
    if(!user.telephone){
        errors.telephone="Telephone is required.";
    }
    if(!user.email){
        errors.email="Email is required.";
    }else if(!/\S+@\S+\.\S+/.test(user.email)){
        errors.email="Email is invalid.";
    }
    if(!user.passport_number){
        errors.passport_number="Passport Number is required.";
    }

    return errors;
}

export default validation;
