import React from "react";
import Navbar from "../components/Header/HeaderUser";
import Signup from "../components/Signup/Signup"
// import PasswordReset from "../components/PasswordReset";
import PropertyListing from "../components/PropertyListing";
import { useParams } from "react-router-dom";


// component specifically for registration form input; slight modification of "Form" component
const PropertyPage = () => {
    const routeParams = useParams();
    console.log(routeParams);
    return (
        <>
        <Navbar/>
        <PropertyListing pageId={routeParams["propertyId"]}/>
        </>
    );

}

export default PropertyPage;