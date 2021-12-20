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
                console.log("not able to create user!");
            }
            history.push("/");
        } catch (err) {
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
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign In</h1>
                        <br />
                        <br />

                        <form action="post" className="SignIn.form" onSubmit={handleSubmit}>
                            <p className="lead text-center">Username:</p>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <br />
                            <p className="lead text-center">Password:</p>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <input type="submit" value="LOG IN" className="button" />
                            <br />
                            {/* <input type="submit" value="Sign Up" className="button" /> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
