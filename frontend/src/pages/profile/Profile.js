import React, { useReducer, useState, useEffect } from "react";
//import "./style.css";
// import "./index.css";
import "../../pages/signUp/signUpForm.css";
import axios from "axios";


function Profile() {
    const username_state = {
        username: ""
    };
    const password_state = {
        password:""
    };
    const firstName_state = {
        first_name:""
    };
    const lastName_state = {
        last_name:""
    };
    const address_state = {
        address:""
    };
    const countryCode_state = {
        country_code:""
    };
    const telephone_state = {
        telephone:""
    };
    const email_state = {
        email:""
    };
    const passportNumber_state = {
        passport_number:""
    };

    
    const [username, setUsername] = useState(username_state);
    const [password, setPassword] = useState(password_state);
    const [first_name, setFirstName] = useState(firstName_state);
    const [last_name, setLastName] = useState(lastName_state);
    const [address, setAddress] = useState(address_state);
    const [country_code, setCountryCode] = useState(countryCode_state);
    const [telephone, setTelephone] = useState(telephone_state);
    const [email, setEmail] = useState(email_state);
    const [passport_number, setPassportNumber] = useState(passportNumber_state);


    const findProfile = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/loggedInUser/get-user"
            );
            setUsername(response.data[0].username);
            setPassword(response.password);
            setFirstName(response.first_name);
            setLastName(response.last_name);
            setAddress(response.address);
            setCountryCode(response.country_code);
            setTelephone(response.telephone);
            setEmail(response.email);
            setPassportNumber(response.passport_number);
        } catch (err) {
            console.log("error occured while posting the user using axios!");
            console.log(err);
        }
    };

    useEffect(() => {
        findProfile();
    }, []);
        

    // const editProfileHandler = (username) => {
    //     routeChange(`/booking`);
    // };
    return (
        <>
            <div>
                <div className="container">
                    <div className="app-wrapper">
                        <div>
                            <h2 className="title">Account Details</h2>
                        </div>
                        <form className="signUpform">
                            <div className="username">
                                <label className="label">Username: {username.username}</label>
                            </div>
                            <div className="password">
                                <label className="label">Password: {password.password}</label>
                            </div>
                            <div className="firstName">
                                <label className="label">First Name: {first_name.first_name}</label>
                            </div>
                            <div className="lastName">
                                <label className="label">Last Name: {last_name.last_name}</label>
                            </div>
                            <div className="address">
                                <label className="label">Address: {address.address}</label>
                            </div>
                            <div className="countryCode">
                                <label className="label">Country Code: {country_code.country_code}</label>
                            </div>
                            <div className="telephone">
                                <label className="label">Telephone: {telephone.telephone}</label>
                            </div>
                            <div className="email">
                                <label className="label">Email: {email.email}</label>
                            </div>
                            <div className="passportNumber">
                                <label className="label">Passport Number: {passport_number.passport_number}</label>
                            </div>
                            <div>
                                <button className="Signupbutton">
                                    Edit Account Details
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="imagesignup">
                <img src="/images/signup.jpg" alt="" height="100%" width="100%" />
            </div>
        </>
    )
}

export default Profile;
