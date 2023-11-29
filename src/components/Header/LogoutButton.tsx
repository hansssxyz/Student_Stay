import React, { MouseEvent } from 'react';
// imports from firebase
import firebaseApp from '../../firebaseConfig';
import {
    getFirestore,collection,getDocs,onSnapshot,
    addDoc, setDoc, deleteDoc, doc,
    query,where,limit,
    orderBy,
    serverTimestamp,
    getDoc,updateDoc, DocumentSnapshot, snapshotEqual, QuerySnapshot,
} from 'firebase/firestore'

import {getFunctions,httpsCallable} from 'firebase/functions'

import{
    getAuth,createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword,
    onAuthStateChanged,
    confirmPasswordReset,
} from "firebase/auth"

function LogoutButton(){
    const app= firebaseApp;
    const func=getFunctions(app);
    const db=getFirestore(app);
    const auth=getAuth(app);
    var cur_user=auth.currentUser;

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        auth.signOut()
        .then(function() {
            // Sign-out successful.
            window.open('http://localhost:3000', '_self');
        })
        .catch(function(error) {
            alert("Logout error");
        });
    }

    return(
        <button id="button" onClick={clickHandler} className="py-1 px-2 font-lato text-dark-blue text-xl inline-block mx-3 align-middle">Logout</button>

    )
}

export default LogoutButton;