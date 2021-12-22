import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "../../components/button/Button";
import "../../App.css";
import "./SignIn.css";

export default function SignIn() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // console.log("username", username);
    // console.log("password", password);

    const userLogin = async (user) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/users/login",
                user
            );
            console.log("Response Data is: ", response.data);
            console.log("Response Data Token is: ", response.data.token);
            if (response.data.token) {
                console.log(
                    `successfully logged in user with username ${user.user.username}!`
                );
            } else {
                setErrorMessage('Please make sure of your username and password combination');
                console.log("not able to login user!");
            }
            history.push("/");
        } catch (err) {
            setErrorMessage('wrong username & password combination');

            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { user: { username, password } };
        userLogin(user);
    };
    return (
        <div className="SignIn">

            <div className="signcontainer">
                  
                        <form action="post" className="SignIn.form" onSubmit={handleSubmit}>
                            <div className="signin-form-group">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="signin-form-group">
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {errorMessage && <div className="signin-form-group"> <p>{errorMessage} </p></div>}
                            <input type="submit" value="LOG IN" className="button" />
                            {/* <input type="submit" value="Sign Up" className="button" /> */}
                        </form>
                    
                </div>
                
            
            <img src="/images/signin.jpg" alt="" height="100%" width="100%" />

        </div>
    );
}
