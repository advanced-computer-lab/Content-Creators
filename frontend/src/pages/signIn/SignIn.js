import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button } from "../../components/button/Button";
import "../../App.css";
import "./SignIn.css";

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
        };
        axios
            .post("http://localhost:8000/users/login", data)
            .then((res) => {
                this.setState({
                    username: "",
                    password: "",
                });
                this.props.history.push("/");
            })
            .catch((err) => {
                console.log("CANNOT LOG IN!");
            });
    };

    render() {
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

                            <div className="SignIn.form" noValidate onSubmit={this.onSubmit}>
                                <p className="lead text-center">Username:</p>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        className="form-control"
                                        value={this.state.username}
                                        onChange={this.onChange}
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
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <input type="submit" value="LOG IN" className="button" />
                                <br />
                                <input type="submit" value="Sign Up" className="button" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SignIn;
