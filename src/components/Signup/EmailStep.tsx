import React, { useState } from "react";
import { StepComponentProps } from "react-step-builder";
import Form from '../Form';
import Button from '../Button';
import RegForm from '../RegForm';

// obtains new user's email and saves it under global props variable 
// should check if email is official university email (ends in .edu); this is currently disabled for testing purposes
const EmailStep = (props:StepComponentProps) => {
    const formFields = [
        { label: 'Enter your student email: ', name: 'email', type: 'text' , stepProps: props},
    ];

    const [error, setError] = useState('');

    const validateForm = () => {
        const email = props.getState("email", "").trim();
        if (email === '') {
            setError('Please enter your student email.');
            return false;
        } else if (!email.endsWith(".edu")) {
            setError('Please enter an official university student email, which should end in .edu');
            return false;
        }
        return true;
    };

    // obtains new user's email and saves it under global props variable
    const submitHandler = () => {
        if (validateForm()) {
            props.next();
        }
    };


    return (
        <>
            <RegForm
                fields={formFields}
                submitButtonText="Continue"
                onSubmit={submitHandler} // Use submitHandler instead of props.next directly
                onBack={props.prev}
                errorMessage={error} // Pass the error state to display the error message
            />
        </>
    );
};

export default EmailStep;
