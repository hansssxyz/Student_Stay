import React from "react";
import { StepComponentProps } from "react-step-builder";
import Button from '../Button';
import '../../styles/styles.css';

// obtains new user's email and saves it under global props variable 
// should check if email is official university email (ends in .edu); this is currently disabled for testing purposes
const StudentStep = (props:StepComponentProps) => {

    const handleSubmit = () =>{
        var result = (document.getElementById("studentType") as HTMLSelectElement)?.value;
        console.log(result);
        if(result.length<=0){
            alert("Please select an option")
        }else{
            props.setState("studentType", (document.getElementById("studentType") as HTMLSelectElement)?.value);
            props.next();
        }
    }


    return (
        <div id="outer-outer">
            <div id="outerContainer">
                <form onSubmit={handleSubmit}>
                            <div className="flex items-center">
                                <label
                                    className="block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4"
                                    style={{
                                        fontFamily: 'Josefin Sans',
                                        letterSpacing: '-0.04219rem',
                                    }}
                                >
                                    What type of student are you?
                                </label>
                            <div>
                                <select
                                    id="studentType"
                                    className="rounded-full overflow-hidden font-lato py-1 px-2"
                                    style={{
                                        fontFamily: 'Josefin Sans',
                                        letterSpacing: '-0.04219rem',
                                        width: '100%' }}
                                >
                                    <option value="" disabled selected 
                                    style={{
                                        fontFamily: 'Josefin Sans',
                                        color: "grey",
                                    }}
                                    >Select an option</option>
                                    <option id="grad" 
                                    value="Graduate"
                                    style={{
                                        fontFamily: 'Josefin Sans',
                                        color: "black",
                                    }}
                                    >Graduate</option>
                                    <option id="ugrad" 
                                    value="Undergraduate"
                                    style={{
                                        fontFamily: 'Josefin Sans',
                                        color: "black",
                                    }}
                                    >Undergraduate</option>
                                </select>
                            </div>
                        </div>
                    <div className="mt-8" >
                        <Button onClick={props.prev}
                            variant="purple"
                            size="sm"
                            style={{ width: '10rem' }}
                        >Go back</Button>
                        <Button
                            onClick={handleSubmit}
                            variant="purple"
                            size="sm"
                            style={{ width: '10rem' }}
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentStep;