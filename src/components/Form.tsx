import React from 'react';
import Button from './Button';
import '../styles/styles.css';

interface FormProps {
    fields: {
        label: string;
        name: string;
        type: string;
    }[];
    submitButtonText?: string;
    errorMessage?: string;
    onSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ fields, submitButtonText = 'Submit', errorMessage, onSubmit }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e); // when you have a parent function, write an OnSubmit function, which gets handled in this form
    };

    return (
        <div id="outer-outer">
            <div id="outerContainer">
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <div key={index}>
                            <div className="flex items-center">
                                <label
                                    htmlFor={field.name}
                                    className="block text-dark-blue leading-10 tracking-wide mr-4 rounded-full overflow-hidden font-lato"
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
                                    className="rounded-full overflow-hidden font-lato"
                                    style={{ width: '100%',
                                    height: '30px',
                                        letterSpacing: '-0.04219rem',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="mt-8">
                        <Button
                            onClick={handleSubmit}
                            variant="purple"
                            size="sm"
                            style={{ width: '10rem' }}
                        >
                            {submitButtonText}
                        </Button>
                        {errorMessage && <p className="form-error">{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
