import React from "react";
import { StepComponentProps } from "react-step-builder";
import Form from '../Form';
import Button from '../Button';
import RegForm from '../RegForm';

// imports from firebase
import firebaseApp from "../../firebaseConfig";
import {
    getFirestore,collection,getDocs,onSnapshot,
    addDoc, deleteDoc, doc,
    query,where,limit,
    orderBy,
    serverTimestamp,
    getDoc,updateDoc, DocumentSnapshot, snapshotEqual,
} from 'firebase/firestore'

import {getFunctions,httpsCallable} from 'firebase/functions'

import{
    getAuth,createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth"

const app = firebaseApp;
const func=getFunctions(app)
const db=getFirestore(app)
const auth=getAuth(app)
const send_email_verification= httpsCallable(func,"send_email_verification")

// asks user to input their phone number
// last step asking for user info - upon submission, sends user email with verification code
const PhoneStep = (props:StepComponentProps) => {
    const formFields = [
        { label: 'Enter your phone number: ', name: 'phone', type: 'text' , stepProps: props},
    ];

    const submitHandler = () =>{
        let input_email = props.getState("email", "");
        console.log("email input:",input_email) 
        send_email_verification({email:input_email})
        .then((result) => {
            if(result.data.success){
                alert("Email sent!");
                props.setState("correct_code", result.data.password)
                props.next();
            }else{
                console.log(result.data.error);
                alert("Email not sent")
            }
        })
    }

    return(
        <>
            <RegForm
                fields={formFields}
                submitButtonText="Submit"
                onSubmit={submitHandler}
                onBack={props.prev}
            />
        </>
    );
}

export default PhoneStep;