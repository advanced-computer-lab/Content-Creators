import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "./updateUserInfo.css";
import { UserContext } from "../../helpers/UserContext";
import "./updateUserValidation";
import updateUserValidation from "./updateUserValidation";

function UpdateUserInfo() {
    const history = useHistory();
    const [user, setUser] = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});
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

    const updateUserAxios = async (user) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/users/edit-user`,
                user
            );
            console.log("response", response);
            console.log("response.data", response.data);
            if (response.data?.success) {
                console.log("successfully updated user data!");
                history.push("/profile");
            } else {
                console.log("not able to updated user data!");
            }
        } catch (err) {
            console.log("not able to updated user data!");
            console.log(err);
        }
    };

    const cancelHandler = () => {
        window.location.replace("/profile");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
            firstName &&
            lastName &&
            passportNumber &&
            countryCode &&
            telephone &&
            address &&
            email; 
            // || (password && confirmPassword);

            

        if (nonEmpty) {
            console.log("User data Data fully submitted!!");
            let newUser = {
                user: {
                    username: user.username,
                    first_name: firstName,
                    last_name: lastName,
                    address : address,
                    country_code: countryCode,
                    telephone : telephone,
                    email ,
                    passport_number: passportNumber,
                },
            };
            const data = { newUser: { ...user } };
            const errors = updateUserValidation(USER);
            setErrors(errors);
            console.log("SIGN UP ERRORS ARE: ", errors);
            console.log("SIGN UP USER IS: ", user);
            if (password == confirmPassword) {
                newUser.user.password = password;
                newUser.user.confirm_password = confirmPassword; 
                if (Object.keys(errors).length == 0) {
                    updateUserAxios(data);
                }   
            }
           
            const testingUser = {
                user: {
                    username: "husseljo",
                    password: "1234",
                    confirm_password: "12344",
                    first_name: "husseljo",
                    last_name: "SOLIMAN",
                    address: "HELIO",
                    country_code: 30,
                    telephone: "01009991212",
                    email: "husseesin@yashoo.com",
                    passport_number: 853940453890,
                },
            };
            // updateUserAxios(testingUser);
            updateUserAxios(newUser);
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
                <h1>Update User Details: {user.username}</h1>
                <form className="updateUserForm" onSubmit={handleSubmit}>
                    <div>
                        <p className="display-4 text-center">First Name:</p>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Enter name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Change last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="passport">Passport Number</label>
                        <input
                            id="passportNumber"
                            name="passportNumber"
                            type="text"
                            placeholder="Change passport"
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="countryCode">Country Code</label>
                        <input
                            id="countryCode"
                            type="text"
                            name="countryCode"
                            placeholder="Change country code"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        ></input>
                        {errors.country_code && <p className="error">{errors.country_code}</p>}
                    </div>
                    <div>
                        <label htmlFor="telephone">Telephone</label>
                        <input
                            id="telephone"
                            type="text"
                            name="telephone"
                            placeholder="Change telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        ></input>
                        {errors.telephone && <p className="error">{errors.telephone}</p>}
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            placeholder="Change address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">New Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Change password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    <br />
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