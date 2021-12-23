import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';

export default function updateUserInfo(props){
    const userId = props.match.params.id;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passport, setPassport] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignin =useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch()

    useEffect(() =>{
        if(!user){
            dispatch(detailsUser(userInfo._id))
        } else {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPassport(user.passport);
            setEmail(user.email);
        }
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update profile
        if(password !== confirmPassword){
            alert('Password and Confirm Password do not match')
        } else {
            dispatch(updateUserProfile({firstName, lastName, passport, email, password}));
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        id="last name"
                        type="text"
                        placeholder="Change last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></input>
                    </div>
                    <div>
                        <label htmlFor="passport">Passport</label>
                        <input id="passport" 
                        type="text" 
                        placeholder="Change passport" 
                        value={passport}
                        onChange={(e) => setPassport(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" 
                        type="text" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" 
                        type="text" 
                        placeholder="Change password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        <button className="primary" type="submit">Update</button>
                    </div>
            </form>
        </div>
    )
}