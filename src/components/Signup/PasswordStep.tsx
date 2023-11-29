import React, { useState } from "react";
import { StepComponentProps } from "react-step-builder";
import RegForm from '../RegForm';

// asks for user to create and confirm password, returns error message if entries don't match
const PasswordStep = (props:StepComponentProps) => {
    const [error, setError] = useState('');

    const formFields = [
        { label: 'Enter your password: ', name: 'password', type: 'password', stepProps: props },
        { label: 'Confirm password: ', name: 'passConf', type: 'password', stepProps: props },
    ];

    const errorHandler = (errorMessage: string) => {
        setError(errorMessage);
    }

    const submitHandler = () => {
        const password = props.getState("password", "");
        const passConf = props.getState("passConf", "");

        if (password.length < 6 || password.length > 30) {
            errorHandler("Password must be between 6 and 30 characters long");
        } else if (password !== passConf) {
            errorHandler("Passwords don't match");
        } else {
            setError(''); // Clear any previous error message
            props.next();
        }
    }

    return (
        <>
            <RegForm
                fields={formFields}
                submitButtonText="Continue"
                onSubmit={submitHandler}
                onBack={props.prev}
                errorMessage={error}
            />
        </>
    );
}

export default PasswordStep;
