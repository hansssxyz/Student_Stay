import Navbar from "../components/Header/HeaderUser"
import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Header from "../components/Header/Header";
import PropertyTiles from "../components/PropertyTiles";

function Dashboard(){
    return(
        <>
        <Navbar />
        <div className="justify-center m-8">
            <div className="flex justify-center mt-5 text-sky-blue text-3xl">
                sublease from students · sublease to students
            </div>
            <div className="flex justify-center mt-5 text-dark-blue text-4xl">
                student housing has never been easier
            </div>
            </div>
        <SearchBar />
        </>
    )

}

export default Dashboard;