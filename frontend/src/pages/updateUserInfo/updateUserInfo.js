import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "./updateUserInfo.css";

function UpdateUserInfo(){
    // let location = useLocation();
    // const history = useHistory();

    const [data, setData] = useState([]);

    const updateUserAxios = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/users/edit-user`
            );
            setData(response.data[0]);
            const {
                first_name,
                last_name,
                email,
                passport_number,
            } = response.data[0];

            const originalUserInfo = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                passport_number: passport_number,
            };
            setUser(originalUserInfo);
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

    const [user, setUser] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [passport_number, setPassport] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangeFirstName = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFirstName({ ...first_name, [name]: value });
    };
    const handleChangeConfirmPassword = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setConfirmPassword({ ...confirmPassword, [name]: value });
    };
    const handleChangeLastName = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLastName({ ...last_name, [name]: value });
    };
    const handleChangeEmail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEmail({ ...email, [name]: value });
    };
    const handleChangePassword = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPassword({ ...password, [name]: value });
    };
    const handleChangePassport = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPassport({ ...passport_number, [name]: value });
    };
    const cancel = (e) => {
        window.location.replace("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
            (user.confirmPassword && user.password) ||
            user.first_name ||
            user.last_name ||
            user.passport_number ||
            user.email ;

        if (nonEmpty) {
            console.log("Data fully submitted!!");

            const fullInfo = {
                users: {
                    ...user,
                    first_name: first_name,
                    last_name: last_name,
                    passport: passport_number,
                    email: email,
                    password: password,
                },
            };
            updateUserAxios(fullInfo);
        } else {
            console.log("Not entire form is filled");
        }
    };


    return(
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
                        value={first_name.first_name}
                        onChange={handleChangeFirstName}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        id="last name"
                        type="text"
                        placeholder="Change last name"
                        value={last_name.last_name}
                        onChange={handleChangeLastName}
                    ></input>
                    </div>
                    <div>
                        <label htmlFor="passport">Passport</label>
                        <input id="passport" 
                        type="text" 
                        placeholder="Change passport" 
                        value={passport_number.passport_number}
                        onChange={handleChangePassport}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" 
                        type="text" 
                        placeholder="Enter email" 
                        value={email.email}
                        onChange={handleChangeEmail}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" 
                        type="password" 
                        placeholder="Change password" 
                        value={password.password}
                        onChange={handleChangePassword}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" 
                        type="password" 
                        placeholder="Enter Confirm Password"
                        value={confirmPassword.confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        ></input>
                    </div>
                    <button type="submit" value="Cancel" className="cancelButton" onClick={cancel}>Cancel</button>

                        <button className="updatebutton" type="submit" onClick={handleSubmit}>Update</button>
            </form>
        </div>
        </div>
    )
}
export default UpdateUserInfo;