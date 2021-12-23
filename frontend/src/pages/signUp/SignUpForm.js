import React, { useReducer, useState, useEffect } from "react";
import { FlatButton, RaisedButton } from "material-ui";
import TextField from "material-ui/TextField";
import PasswordStr from "./PasswordStr";
//import "./style.css";
// import "./index.css";
import "../../pages/signUp/signUpForm.css";
import validation from "./validation";
import axios from "axios";


const SignUpForm = ({submitForm}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [country_code, setCountryCode] = useState();
    const [telephone, setTelephone] = useState();
    const [email, setEmail] = useState("");
    const [passport_number, setPassport] = useState("");
    
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    let user= {
        username: String,
        password: String,
        first_name: String,
        last_name: String,
        address: String,
        country_code: String,
        telephone: Number,
        email: String,
        passport_number: String,
    };
    const handleFormSubmit = (event) =>{
        event.preventDefault();
         user = {  username, password,first_name,last_name,address,country_code,telephone,email,passport_number  };
        setErrors(validation(user));
        setDataIsCorrect(true);
        const data ={user:{...user}};
        axios
            .post("http://localhost:8000/users/sign-up", data)
            .then((res) => {
                this.setState({
                    username: "",
                    password: "",
                });
                this.props.history.push("/");
            })
            .catch((err) => {
                console.log("CANNOT sign up");
            });
    }



    useEffect(() => {
        if(Object.keys(errors).length===0 && dataIsCorrect){
            submitForm(true);
        }
    },[errors]);

    console.log("user is: ", user);
    return (
        <>

<div>

        <div className="container">
            <div className="app-wrapper">
                <div>
                    <h2 className="title"> Create Account</h2>
                </div>
                <form className="form-wrapper">
                    <div className="username">
                        <label className="label">Username</label>
                        <input 
                        className="input" 
                        type="text" 
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="password">
                        <label className="label">Password</label>
                        <input className="input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="firstName">
                        <label className="label">First Name</label>
                        <input className="input" type="text" name="firstname" value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
                        {errors.first_name && <p className="error">{errors.first_name}</p>}
                    </div>
                    <div className="lastName">
                        <label className="label">Last Name</label>
                        <input className="input" type="text" name="lastname" value={last_name} onChange={(e) => setLastName(e.target.value)}/>
                        {errors.last_name && <p className="error">{errors.last_name}</p>}
                    </div>
                    <div className="address">
                        <label className="label">Address</label>
                        <input className="input" type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        {errors.address && <p className="error">{errors.address}</p>}
                    </div>
                    <div className="countryCode">
                        <label className="label">Country Code</label>
                        <input className="input" type="number" name="countryCode" value={country_code} onChange={(e) => setCountryCode(e.target.value)}/>
                        {errors.country_code && <p className="error">{errors.country_code}</p>}
                    </div>
                    <div className="telephone">
                        <label className="label">Telephone</label>
                        <input className="input" type="text" name="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
                        {errors.telephone && <p className="error">{errors.telephone}</p>}
                    </div>
                    <div className="email">
                        <label className="label">Email</label>
                        <input className="input" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="passportNumber">
                        <label className="label">Passport Number</label>
                        <input className="input" type="text" name="passportNumber" value={passport_number} onChange={(e) => setPassport(e.target.value)}/>
                        {errors.passport_number && <p className="error">{errors.passport_number}</p>}
                    </div>
                    <div>
                        <button className="submit" onClick={handleFormSubmit}>Sign up</button>
                    </div>
                </form>
            </div>
            
        </div>


        </div>
        <div className="imagesignup">
            <img src="/images/signup.jpeg" alt="" height="100%" width="100%" />

        </div>
        </>
    )

    }
export default SignUpForm;