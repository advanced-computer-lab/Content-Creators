import React, { useReducer, useState } from "react";
import { FlatButton, RaisedButton } from "material-ui";
import TextField from "material-ui/TextField";
import PasswordStr from "./PasswordStr";
import "./style.css";
// import "./index.css";

const SignUpForm = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [btnTxt, setBtnTxt] = useState("show");
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState("There is an error!");
    const [type, setType] = useState("Type whatever");

    console.log("user is: ", user);
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
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <TextField
                    name="email"
                    floatingLabelText="email"
                    value={user.email}
                    errorText={errors.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <TextField
                    type={type}
                    name="password"
                    floatingLabelText="password"
                    value={user.password}
                    errorText={errors.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                    name="passwordConfirm"
                    floatingLabelText="confirm password"
                    value={user.passwordConfirm}
                    errorText={errors.passwordConfirm}
                    onChange={(e) => {
                        if (user.password) {
                            setUser({ ...user, passwordConfirm: e.target.value });
                        }
                    }}
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
