import React from "react";
import Navbar from "../components/Header/HeaderRegister"
import Signup from "../components/Signup/Signup"

const SignupPage = () => {
    return (
        <div>
            <Navbar/>
            <div className="py-5 px-2 flex justify-center">
                <div className=" font-josefin-sans text-purple text-3xl inline-block mx-3 align-middle">
                    Sign up for Student Stay
                </div>
            </div>
            <Signup/>
        </div>

    );
};

export default SignupPage;