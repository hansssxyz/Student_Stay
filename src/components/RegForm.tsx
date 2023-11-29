import React from 'react';
import Button from './Button';
import '../styles/styles.css';
import { StepComponentProps } from "react-step-builder";

interface FormProps {
    fields: {
        label: string;
        name: string;
        type: string;
        stepProps: StepComponentProps;
    }[];
    submitButtonText?: string;
    errorMessage?: string;
    onSubmit: (e: React.FormEvent) => void;
    onBack: (e: React.FormEvent) => void;
    disableBackButton?: boolean; // prop to disable "Go back" button in the first step
}

// component specifically for registration form input; slight modification of "Form" component
const RegForm: React.FC<FormProps> = ({ fields, submitButtonText = 'Submit', errorMessage, onSubmit, onBack, disableBackButton }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e); // when you have a parent function, write an OnSubmit function, which gets handled in this form
    };

    const handleBack = (e: React.FormEvent) => {
        e.preventDefault();
        onBack(e);
    };

    return (
        <div id="outer-outer">
            <div id="outerContainer">
                <form onSubmit={handleSubmit}>

                    <div id="innerContainer" class="max-w-screen-full px-5">
                        {fields.map((field, index) => (
                            <div key={index}>
                                <div className=" items-center">
                                    <label
                                        htmlFor={field.name}
                                        className="block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4 max-w-sm content-center"
                                        style={{
                                            fontFamily: 'Josefin Sans',
                                            letterSpacing: '-0.04219rem',
                                        }}
                                    >
                                        {field.label}
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        id={field.name}
                                        className="rounded-full overflow-hidden font-lato py-1 px-2 max-w-max"
                                        value={field.stepProps.getState(field.name, "")}
                                        onChange={field.stepProps.handleChange}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 max-w-screen-full px-5 break-words" >
                            {!disableBackButton && ( // Conditionally render the "Go back" button based on disableBackButton prop
                                <Button onClick={handleBack}
                                        variant="purple"
                                        size="sm"
                                        style={{ width: '10rem' }}
                                >Go back</Button>
                            )}
                            <Button
                                onClick={handleSubmit}
                                variant="purple"
                                size="sm"
                                style={{ width: '10rem' }}
                            >
                                {submitButtonText}
                            </Button>
                            {errorMessage && <p className="text-red-500 mb-2 items-center">{errorMessage}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegForm;
