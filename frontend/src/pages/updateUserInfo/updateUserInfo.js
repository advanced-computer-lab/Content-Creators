import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

function updateUserInfo(){
    let location = useLocation();
    const history = useHistory();

    const [data, setData] = useState([]);
    const flightNumber = location.pathname.split("/").at(-1);

    const getFlightAxios = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/users/${flightNumber}`
            );
            setData(response.data[0]);
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
            } = response.data[0];

            const originalUserInfo = {
                username: username,
                address: address,
                country_code: country_code,
                telephone: telephone,
            };
            setInfo(originalUserInfo);
            setFirstName(first_name);
            setLastName(last_name);
            setPassport(passport_number);
            setEmail(email);
            setPassword(password);
            console.log("Data is: ", data);
            console.log("Response Data is: ", response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const [info, setInfo] = useState('');

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [passport_number, setPassport] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangeFirstName = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFirstName({ ...tripTime, [name]: value });
    };
    const handleChangeLastName = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLastName({ ...tripTime, [name]: value });
    };
    const handleChangeEmail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEmail({ ...cabinClasses, [name]: value });
    };
    const handleChangePassword = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPassword({ ...airport, [name]: value });
    };
    const handleChangePassport = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPassport({ ...airport, [name]: value });
    };
    const cancel = (e) => {
        window.location.replace("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
            (user.username && user.password) ||
            user.first_name ||
            user.last_name ||
            user.passport_number ||
            user.address ||
            user.country_code ||
            user.telephone ||
            user.email ||
            flight.price;

        if (nonEmpty) {
            console.log("Data fully submitted!!");

            const fullInfo = {
                users: {
                    ...user,
                    first_name: first_name,
                    last_name: last_name,
                    passport: passport,
                    email: email,
                    password: password,
                },
            };
            createFlightAxios(fullInfo);
        } else {
            console.log("Not entire form is filled");
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update profile
        if(password !== confirmPassword){
            alert('Password and Confirm Password do not match')
        } else {
            dispatch(updateUserProfile({first_name, last_name, passport_number, email, password}));
        }
    }
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Update User Details</h1>
                </div>
                <div>
                    <label htmlFor="name">First Name</label>
                    <input
                        id="first name"
                        type="text"
                        placeholder="Enter name"
                        value={first_name}
                        onChange={handleChangeFirstName}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        id="last name"
                        type="text"
                        placeholder="Change last name"
                        value={last_name}
                        onChange={handleChangeLastName}
                    ></input>
                    </div>
                    <div>
                        <label htmlFor="passport">Passport</label>
                        <input id="passport" 
                        type="text" 
                        placeholder="Change passport" 
                        value={passport_number}
                        onChange={handleChangePassport}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" 
                        type="text" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={handleChangeEmail}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" 
                        type="text" 
                        placeholder="Change password" 
                        value={password}
                        onChange={handleChangePassword}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" 
                        type="text" 
                        placeholder="Enter Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label/>
                        <button className="updatebutton" type="submit" onClick={handleSubmit}>Update</button>
                        <button type="submit" value="Cancel" className="cancelButton" onClick={cancel}>Cancel</button>
                    </div>
            </form>
        </div>
    )
}
export default updateUserInfo;