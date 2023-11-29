import React, {useState} from "react";
import { StepComponentProps } from "react-step-builder";
import RegForm from '../RegForm';
import universityList from '../../assets/us_universities.json';
import {set} from "react-hook-form";

// asks for user's university, checks if it is an existing university in the US (source: .json file in assets folder)
// works if user inputs slightly simplified version of full name, i.e. Columbia University instead of Columbia University in the City of New York
// returns error message if user doesn't input valid university
const UniStep = (props:StepComponentProps) => {
    const [uniError, setUniError] = useState('');

    const formFields = [
        { label: 'What is your university? ', name: 'university', type: 'text', stepProps: props },
    ];

    const submissionHandler = () => {
        const userUniversity = props.getState("university", "").trim().toLowerCase(); // Convert user input to lowercase
        let found = false;

        if(userUniversity === ''){
            setUniError('Please enter your university.');
            return false;
        } else{
            setUniError('');
        }

        for (var i = 0; i < universityList.length; i++) {
            // Convert university name from the list to lowercase for case-insensitive comparison
            const universityFromList = universityList[i]["institution"].trim().toLowerCase();

            if (universityFromList.startsWith(userUniversity)) {
                props.setState("university", universityList[i]["institution"]);
                props.next();
                found = true;
                break; // Exit loop when a match is found
            }
        }

        if (!found) {
            alert("University not found - try again");
        }


    }

    return (
        <>
            <RegForm
                fields={formFields}
                submitButtonText="Continue"
                onSubmit={submissionHandler}
                onBack={props.prev}
                errorMessage={uniError}
            />
        </>
    );
}

export default UniStep;
