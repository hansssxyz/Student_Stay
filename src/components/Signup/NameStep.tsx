import React, {useState} from "react";
import { StepComponentProps } from "react-step-builder";
import Button from "../Button";
import Form from '../Form';
import RegForm from '../RegForm';

const NameStep = (props:StepComponentProps) => {

    const { step } = props;
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const formFields = [
        { label: 'Enter your first name: ', name: 'fname', type: 'text' , stepProps: props},
        { label: 'Enter your last name: ', name: 'lname', type: 'text' , stepProps: props},
    ];

    const validateForm = () => {
        const firstName = props.getState("fname", "").trim();
        const lastName = props.getState("lname", "").trim();

        if (firstName === '') {
            setFirstNameError('Please enter your first name.');
            return false;
        } else {
            setFirstNameError('');
        }

        if (lastName === '') {
            setLastNameError('Please enter your last name.');
            return false;
        } else {
            setLastNameError('');
        }

        return true;
    };

    const handleBack = () => {
        if (step > 0) {
            props.prev();
        }
    };

    return(
        <>
            <RegForm
                fields={formFields}
                submitButtonText="Continue"
                onSubmit={() => {
                    if (validateForm()) {
                        props.next();
                    }
                }}
                onBack={handleBack}
                disableBackButton={true}
                errorMessage={firstNameError || lastNameError}
            />
        </>
    );
}

export default NameStep;