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
    getDoc,updateDoc, DocumentSnapshot, snapshotEqual, setDoc,
} from 'firebase/firestore'
import {getStorage,ref,uploadBytes,listAll,getDownloadURL} from "firebase/storage"
import {getFunctions,httpsCallable} from 'firebase/functions'
import{
    getAuth,createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth"

// firebase setup
const app = firebaseApp;
const func=getFunctions(app)
const db=getFirestore(app)
const auth=getAuth(app)
const storage = getStorage(app)

// asks for user verification code, checks that it is the same as one sent in email 
// supposed to create user account in database - this doesn't work at the moment, returns error message
const VerificationStep = (props:StepComponentProps) => {
    const submitHandler = () => {
        let input_code = props.getState("confCode", "");
        if(props.getState("correct_code", "")!=input_code){
            alert("Verification code wrong. Please try again");
        }else{
            createUserWithEmailAndPassword(auth,props.getState("email", ""),props.getState("password", ""))
            .then((user)=>{
                // storing all the user info in the backend database
                const fname = props.getState("fname", "");
                const lname = props.getState("lname", "");
                const email = props.getState("email", "");
                const universityName = props.getState("university", "");
                const programName = props.getState("studentType", "");
                const phoneNumber = props.getState("phone", "");
                const userPhoto = props.getState("photo", "");
                const photoStorage=ref(storage,`/user_photos/${email}`)
                const photoRef=ref(storage,`/user_photos/${email}/${userPhoto.name}`)
            // wait for photo upload
            uploadBytes(photoRef,userPhoto)
            .then(()=>{
                return listAll(photoStorage)
            })
            .then((response)=>{
                const downlowdUrlPromises=response.items.map((item)=>getDownloadURL(item));
                return Promise.all(downlowdUrlPromises);
            })
            .then((downloadUrls)=>{
                const colRef_user=collection(db,"user_profile")
                const userDocRef=doc(colRef_user, email);
                 setDoc(userDocRef,{
                    first_name: fname,
                    last_name: lname,
                    email_address: email,
                    university_name:universityName,
                    program_name:programName,
                    phone_number:phoneNumber,
                    profileUrls:downloadUrls,
                    createdAt:serverTimestamp()
                })
                .catch((error)=>{
                    console.log(auth.currentUser);
                    console.error("Error writing document: ", error);
                })
            })
            props.next();
            })
            .catch((err)=>{
                alert("Sorry, we encountered an error. Please try again.");
            });
        }
    }

    const formFields = [
        { label: 'Enter the 5-digit code: ', name: 'confCode', type: 'text' , stepProps: props},
    ];

    return(
        <>
            <label
                htmlFor="We've sent a confirmation code to your student email"
                className="block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4"
                style={{
                    fontFamily: 'Josefin Sans',
                    letterSpacing: '-0.04219rem',
                }}
            ></label>
            <RegForm
                fields={formFields}
                submitButtonText="Finish"
                onSubmit={submitHandler}
                onBack={props.prev}
            />
        </>
    );
}

export default VerificationStep;