import Navbar from "../components/Header/HeaderUser"
import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Header from "../components/Header/Header";
import PropertyTiles from "../components/PropertyTiles";
import "../styles/styles.css";
import "../styles/card.scss";

import firebaseApp from "../firebaseConfig";
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

function UserInfo(){
    const app= firebaseApp;
    const func=getFunctions(app);
    const db=getFirestore(app);
    const auth=getAuth(app);
    var cur_user=auth.currentUser;

    // if user is not logged in
    auth.onAuthStateChanged((user)=>{
        var email = user["email"];
        const docRef = doc(db, "user_profile", email);
        getDoc(docRef)
        .then((querySnapshot)=>{
            var userData = querySnapshot.data();
            console.log(userData);
            document.getElementById("heading").innerHTML = "Welcome to StudentStay, "+userData["first_name"];
            var img = document.getElementById("profImage") as HTMLImageElement;
            img.src = userData["profileUrls"][0]
            document.getElementById("name").innerHTML = "Name: "+userData["first_name"]+" "+userData["last_name"];
            document.getElementById("email").innerHTML = "Email: "+userData["email_address"];
            document.getElementById("university").innerHTML = "University: "+userData["university_name"];
            document.getElementById("program").innerHTML = "Program: "+userData["program_name"];
            document.getElementById("phone").innerHTML = "Phone number: "+userData["phone_number"];
        })
        const docRef1 = doc(db, "listings", email);
        getDoc(docRef1)
        .then((querySnapshot)=>{
            var data = querySnapshot.data();
            document.getElementById("propCard").onclick = () => {
                window.open("http://localhost:3000/property/"+data["createdAt"]["nanoseconds"]);
            }
            var img = document.getElementById("propImage") as HTMLImageElement;
            img.src = data["imageUrls"][0];
            document.getElementById("location").innerHTML = data["type"].charAt(0).toUpperCase()+data["type"].slice(1)+` in `+data["city"]
            document.getElementById("details").innerHTML = data["num_bedrooms"]+" bedroom, "+data["num_bathrooms"]+" bath";
            document.getElementById("price").innerHTML = "$"+data["desired_price"]+"/month";
        })
        
    });

    return(
        <>
        <Navbar />
        <div className="justify-center m-8">
            <div id = "heading" className="flex justify-center mt-5 text-dark-blue text-4xl">
            </div>
            <div className="flex flex-row space-x-96">
                <div id = "outerContainer3" className="flex-col items-center mt-5 mx-28 text-black">
                    <div id="subheading" className="text-3xl w-96">Your info
                    <hr className="border-1 border-black"/>
                    </div>
                    <div>
                    <img id="profImage" className = "mt-10 mb-5 rounded-full h-48 w-48 mb-5 object-cover"/>
                    <div id="name" className="text-m"></div>
                    <div id="email" className="text-m"></div>
                    <div id="university" className="text-l"></div>
                    <div id="program" className="text-l"></div>
                    <div id="phone" className="text-l "></div>
                    </div>
                </div>

                <div id = "outerContainer3" className="flex-col mt-5 mx-28 text-black">
                    <div id="subheading" className="text-3xl w-96">Your listings
                    <hr className="border-1 border-black"/>
                    </div>
                    <div id = "propCard" className="box-content h-50 w-72 p-4 rounded-md mb-2 mt-10">
                        <img id="propImage" className="rounded-md mb-2 object-fill h-40 w-72"/>
                        <div id="location" className = "block text-dark-blue text-l rounded-full font-lato"></div>
                        <div id="details" className = "text-l"></div>
                        <div id="price" className = "font-bold text-l"></div>
                    </div>
                    
                </div>
            </div>
        </div>
        </>

    );

}

export default UserInfo;