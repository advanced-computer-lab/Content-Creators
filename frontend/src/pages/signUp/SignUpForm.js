import React from "react";
import { FlatButton, RaisedButton } from "material-ui";
import TextField from "material-ui/TextField";
import PasswordStr from "./PasswordStr";
import "./style.css";
import "./index.css";

const SignUpForm = ({ errors, user, score, btnTxt, type }) => {
    return (
        <div className="loginBox">
            <h1>Sign Up</h1>
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

            <form onSubmit={() => console.log("SUBMITTED")}>
                <TextField
                    name="username"
                    floatingLabelText="user name"
                    value={user.username}
                    errorText={errors.username}
                />
                <TextField
                    name="email"
                    floatingLabelText="email"
                    value={user.email}
                    errorText={errors.email}
                />
                <TextField
                    type={type}
                    name="password"
                    floatingLabelText="password"
                    value={user.password}
                    errorText={errors.password}
                />

                <div className="pwStrRow">
                    {score >= 1 && (
                        <div>
                            <PasswordStr score={score} />
                            <FlatButton
                                className="pwShowHideBtn"
                                label={btnTxt}
                                style={{
                                    position: "relative",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                            />
                        </div>
                    )}
                </div>
                <TextField
                    type={type}
                    name="pwconfirm"
                    floatingLabelText="confirm password"
                    value={user.pwconfirm}
                    errorText={errors.pwconfirm}
                />
                <br />
                <RaisedButton
                    className="signUpSubmit"
                    primary={true}
                    type="submit"
                    label="submit"
                />
            </form>
            <p>
                Aleady have an account? <br />
                <a href="/">Log in here</a>
            </p>
        </div>
    );
};

export default SignUpForm;
