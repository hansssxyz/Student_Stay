import React from "react";
import Navbar from "../components/Header/HeaderLogin"
import Login from "../components/Login"

const LoginPage = () => {
    return (
        <div>
            <Navbar/>
            <div className="py-5 px-2 flex justify-center">
                <div className=" font-josefin-sans text-purple text-3xl inline-block mx-3 align-middle">
                    Sign in to Student Stay
                </div>
            </div>
            <Login/>
        </div>

    );
};

export default LoginPage;
