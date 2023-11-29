import React from "react";
import Navbar from "./Header/HeaderLogin"
// imports from Firebase
import firebaseApp from "../firebaseConfig";
import{
    getAuth,
    sendPasswordResetEmail,
} from "firebase/auth"
import Button from "./Button";


const PasswordResetPage = () => {
    const app = firebaseApp;
    const auth=getAuth(app)

    const handleSubmit = () => {
        console.log("check");
        const input_email = (document.getElementById("email") as HTMLInputElement).value;
        sendPasswordResetEmail(auth,input_email)
        .then(()=>{
            alert("Password reset email succcessfully sent!");
            window.open("http://localhost:3000/login", "_self");
        })
        .catch((err)=>{
            alert("Sorry, there was an error. Please try again.")
        })
    }
    return(
        <>
        <Navbar />
        <div className="py-5 px-2 flex justify-center">
                <div className=" font-josefin-sans text-purple text-3xl inline-block mx-3 align-middle">
                    Reset Password
                </div>
        </div>
        <div id="outer-outer">
            <div id="outerContainer">
                <div className="items-center">
                        <div className="flex items-center justify-center">
                            <label
                                htmlFor="email"
                                className="block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4"
                                style={{
                                    fontFamily: 'Josefin Sans',
                                    letterSpacing: '-0.04219rem',
                                }}
                            >
                                Enter your email
                            </label>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="rounded-full overflow-hidden font-lato py-1 px-2"
                                size={30}
                                style={{ width: '100%' }}
                            />
                        </div>
                    <div className="mt-8 flex items-center justify-center">
                        <Button
                            onClick={handleSubmit}
                            variant="purple"
                            size="sm"
                            style={{ width: '10rem' }}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default PasswordResetPage;