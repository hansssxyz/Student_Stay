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
}

// component specifically for registration form input; slight modification of "Form" component
const RegForm: React.FC<FormProps> = ({ fields, submitButtonText = 'Submit', errorMessage, onSubmit}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e); // when you have a parent function, write an OnSubmit function, which gets handled in this form
    };

    const handlePasswordReset = () => {
        window.open('http://localhost:3000/reset-password');
    }

    return (
        <div id="outer-outer">
            <div id="outerContainer">
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <div key={index}>
                            <div className="flex items-center">
                                <label
                                    htmlFor={field.name}
                                    className="block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4"
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
                                    className="rounded-full overflow-hidden font-lato py-1 px-2"
                                    style={{ width: '100%' }}
                                    value={field.stepProps.getState(field.name, "")}
                                    onChange={field.stepProps.handleChange}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="mt-8 flex flex-col items-center justify-center">
                        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

                        <Button
                            onClick={handleSubmit}
                            variant="purple"
                            size="sm"
                            style={{ width: '10rem' }}
                        >
                            {submitButtonText}
                        </Button>

                        <Button
                            onClick={handlePasswordReset}
                            variant="blue"
                            size="sm"
                            style={{ width: '10rem' }}
                        >
                            Forgot password?
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegForm;
