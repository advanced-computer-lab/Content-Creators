import React, { useReducer, useState, useEffect } from "react";
import "../../pages/signUp/signUpForm.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Profile() {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [passportNumber, setPassportNumber] = useState("");

    const findProfile = async () => {
        try {
            const url = "http://localhost:8000/users/get-user";
            const response = await axios.get(url);
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
            } = response.data;

            console.log("get-user response", response);
            console.log("get-user response.data", response.data);
            setUsername(username);
            setPassword(password);
            setFirstName(first_name);
            setLastName(last_name);
            setAddress(address);
            setCountryCode(country_code);
            setTelephone(telephone);
            setEmail(email);
            setPassportNumber(passport_number);
        } catch (err) {
            console.log("error occured while posting the user using axios!");
            console.log(err);
        }
    };

    useEffect(() => {
        findProfile();
    }, []);

    const editProfileHandler = () => {
        history.push("/edit-profile");
    };

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
                                <label className="label">Username: {username}</label>
                            </div>
                            {/* <div className="password"> */}
                            {/*     <label className="label">Password: {password}</label> */}
                            {/* </div> */}
                            <div className="firstName">
                                <label className="label">First Name: {firstName}</label>
                            </div>
                            <div className="lastName">
                                <label className="label">Last Name: {lastName}</label>
                            </div>
                            <div className="address">
                                <label className="label">Address: {address}</label>
                            </div>
                            <div className="countryCode">
                                <label className="label">Country Code: {countryCode}</label>
                            </div>
                            <div className="telephone">
                                <label className="label">Telephone: {telephone}</label>
                            </div>
                            <div className="email">
                                <label className="label">Email: {email}</label>
                            </div>
                            <div className="passportNumber">
                                <label className="label">
                                    Passport Number: {passportNumber}
                                </label>
                            </div>
                            <div>
                                <button className="Signupbutton" onClick={editProfileHandler}>
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
    );
}

export default Profile;
