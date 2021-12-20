import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
const axios = require("axios");

export default function SignUpContainer() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        pwconfirm: "",
    });
    const [btnTxt, setBtnTxt] = useState("show");
    const [password, setPassword] = useState("password");
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState("There is an error!");
    const [type, setType] = useState("Type whatever");

    return (
        <div>
            <MuiThemeProvider>
                <SignUpForm
                    errors={errors}
                    user={user}
                    score={score}
                    btnTxt={btnTxt}
                    type={type}
                />
            </MuiThemeProvider>
        </div>
    );
}
