import React from "react";
import { StepComponentProps } from "react-step-builder";
import Form from '../Form';
import Button from '../Button';
import RegForm from '../RegForm';


const PhotoStep = (props:StepComponentProps) => {
    const formFields = [
        { label: 'Upload a profile photo: ', name: 'photo', type: 'file', stepProps: props},
    ];

    // will replace props.next for onSubmit attribute
    const submitHandler = () =>{
        let img = document.getElementById("photo") as HTMLInputElement;
        console.log(img.files[0].type);
        if(img!=null){
            if(img.files[0].type.startsWith("image")){
                props.setState("photo", img.files[0]);
                props.next();
            }else{
                alert("Please upload a valid image")
            }
        }else{
            alert("Please upload an image")
        }

    }

    return(
        <>
            <RegForm
                fields={formFields}
                submitButtonText="Continue"
                onBack={props.prev}
                onSubmit={submitHandler}
            />
        </>
    );
}

export default PhotoStep;