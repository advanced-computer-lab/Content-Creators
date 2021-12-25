import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "./updateUserInfo.css";

function UpdateUserInfo() {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [data, setData] = useState([]);

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

    const updateUserAxios = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/users/edit-user`);
            console.log("response.data in editing is: ", response.data);

            // setData(response.data[0]);
            // const { first_name, last_name, email, passport_number } =
            //     response.data[0];
            //             const originalUserInfo = {
            //                 first_name: first_name,
            //                 last_name: last_name,
            //                 email: email,
            //                 passport_number: passport_number,
            //             };
            //             setFirstName(first_name);
            //             setLastName(last_name);
            //             setPassportNumber(passport_number);
            //             setEmail(email);
            //             setPassword(password);
            //             console.log("Data is: ", data);
            //             console.log("Response Data is: ", response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const cancelHandler = () => {
        window.location.replace("/profile");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
            password &&
            confirmPassword &&
            firstName &&
            lastName &&
            passportNumber &&
            email;

        if (nonEmpty) {
            console.log("User data Data fully submitted!!");
            const fullInfo = {
                user: {
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    address,
                    country_code: countryCode,
                    telephone,
                    email,
                    passport_number: passportNumber,
                },
            };
            console.log("User full info is", fullInfo);
            // updateUserAxios(fullInfo);
        } else {
            console.log("Not entire form is filled");
        }
    };

    const USER = {
        firstName,
        lastName,
        passportNumber,
        email,
        telephone,
        countryCode,
        address,
        password,
        confirmPassword,
    };
    console.log("USER IN UPDATE IS: ", USER);

    return (
        <div>
            <div className="updateUserContainer">
                <h1>Update User Details</h1>
                <form className="updateUserForm" onSubmit={handleSubmit}>
                    <div>
                        <p className="display-4 text-center">First Name:</p>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="Enter name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            id="last name"
                            type="text"
                            placeholder="Change last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="passport">Passport Number</label>
                        <input
                            id="passport"
                            type="text"
                            placeholder="Change passport"
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="passport">Country Code</label>
                        <input
                            id="passport"
                            type="text"
                            placeholder="Change passport"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="passport">Telephone</label>
                        <input
                            id="passport"
                            type="text"
                            placeholder="Change passport"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="passport">Address</label>
                        <input
                            id="passport"
                            type="text"
                            placeholder="Change passport"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="password">New Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Change password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Enter Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                    </div>
                    <button
                        type="submit"
                        value="Cancel"
                        className="cancelButton"
                        onClick={cancelHandler}
                    >
                        Cancel
                    </button>

                    <button className="updatebutton" type="submit" onClick={handleSubmit}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
export default UpdateUserInfo;
