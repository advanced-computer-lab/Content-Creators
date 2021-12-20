import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
const axios = require("axios");

export default function SignUpContainer() {
    return (
        <div>
            <MuiThemeProvider>
                <SignUpForm />
            </MuiThemeProvider>
        </div>
    );
}
