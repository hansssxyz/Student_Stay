import React, { useRef, useEffect } from "react";
import Navbar from "../components/Header/HeaderLanding";
import SearchBar from "../assets/search-bar.jpg";
import SampleListing from "../assets/listing.JPG";
import ListingCards from "../assets/ListingCards.jpg";
import CreateListing from "../assets/CreateListing.png";

import firebaseApp from "../firebaseConfig";
import{
    getAuth
} from "firebase/auth"

const Landing = () => {
    const app = firebaseApp;
    const auth = getAuth(app);
    var cur_user=auth.currentUser;
    auth.onAuthStateChanged((user)=>{
        if(user!=null){
            window.open('http://localhost:3000/dashboard', '_self');
        }
    })
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        let scrollValue = 0;

        const scrollStep = () => {
            scrollValue += 1;
            if (scrollValue >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
                scrollValue = 0;
            }
            scrollContainer.scrollTop = scrollValue;
            requestAnimationFrame(scrollStep);
        };

        const animationId = requestAnimationFrame(scrollStep);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    const handleLoginClick = () => {
        window.location.href = "http://localhost:3000/login";
    };

    const handleRegisterClick = () => {
        window.location.href = "http://localhost:3000/register";
    };

    return (
        <div>
            <Navbar />

            <div className="justify-center m-8">
            <div className="flex justify-center mt-5 text-sky-blue text-3xl">
                sublease from students · sublease to students
            </div>
            <div className="flex justify-center mt-5 text-dark-blue text-4xl">
                student housing has never been easier
            </div>
            </div>

            <div className="m-8 md:flex md:justify-center mt-5">
                <div className="md:w-1/2 w-full md:p-5 p-sm-6 py-lg-8 pl-lg-8 pr-lg-12 justify-start rounded overflow-hidden shadow-lg bg-light-blue/20 hover:bg-light-blue/90 transition duration-300 ease-in-out">
                    <div className="flex justify-center mt-5 text-dark-blue text-2xl">
                        search for places by availability
                    </div>
                    <img src={SearchBar} alt="Search Bar" className="w-full" />
                    <img src={ListingCards} alt="Listing Cards" className="w-full" />
                </div>

                <div className="m-8 md:w-1/2 w-full md:p-5 p-sm-6 py-lg-8 pl-lg-8 pr-lg-12 justify-start rounded overflow-hidden shadow-lg bg-light-blue/20 hover:bg-light-blue/90 transition duration-300 ease-in-out">
                    <div className="flex justify-center mt-5 text-dark-blue text-2xl">
                        transparent info + easy contact
                    </div>
                    <img src={SampleListing} alt="Sample Listing" className="w-full" />
                </div>
            </div>

            <div className="m-8 md:flex md:justify-center mt-5">

                <div className="m-8 md:w-1/2 w-full md:p-5 p-sm-6 py-lg-8 pl-lg-8 pr-lg-12 justify-start rounded overflow-hidden shadow-lg bg-light-blue/20 hover:bg-light-blue/90 transition duration-300 ease-in-out">
                    <div className="flex justify-center mt-5 text-dark-blue text-2xl">
                        list your place in just 5 steps
                    </div>
                    <div
                        ref={scrollContainerRef}
                        className="max-h-64 overflow-y-auto"
                    >
                        <img src={CreateListing} alt="Create Listing" className="w-full" />
                    </div>
                </div>

                <div className="m-8 md:w-1/2 w-full md:p-5 p-sm-6 py-lg-8 pl-lg-8 pr-lg-12 justify-center items-center rounded overflow-hidden shadow-lg bg-light-blue/20 hover:bg-light-blue/90 transition duration-300 ease-in-out mt-8 md:mt-0">
                    <div className="flex flex-col items-center h-full justify-center">
                        <div className="text-purple text-3xl mb-3">
                            list a place
                        </div>
                        <div className="text-purple text-3xl mb-3">
                            find a place
                        </div>
                        <div className="text-dark-blue text-4xl mb-6">
                            hassle-free housing
                        </div>

                        <div className="flex justify-center">
                            <button
                                className="btn purple text-lg text-center w-50"
                                onClick={handleLoginClick}
                            >
                                Login
                            </button>
                            <button
                                className="btn purple text-lg text-center ml-2 w-50"
                                onClick={handleRegisterClick}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Landing;
