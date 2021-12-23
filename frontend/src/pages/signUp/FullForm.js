import React, {useState} from 'react'
import SignUpForm from './SignUpForm';

function Form() {
    const [formIsSubmitted, setFormIsSubmitted]= useState(false);
    const submitForm = () =>{
        setFormIsSubmitted(true);
    }
    return (
        <div>
            { !formIsSubmitted ? <SignUpForm submitForm={submitForm}/> : <h1 className="form-success">Account Successfully Created!</h1>
}

        </div>
    )
}

export default Form