import React from "react";
import { StepComponentProps } from "react-step-builder";
import '../../styles/styles.css';

// this page shows up as soon as user's account has been successfully created
// (i.e. account info has been sent to database)
const FinalStep= (props:StepComponentProps) => {
    console.log(props.state.photo);
    return(
        <div>
            <p><b>Welcome to StudentStay! The following account info has been submitted to our database:</b></p>
            <p>Name: {props.state.fname}</p>
            <p>Surname: {props.state.lname}</p>
            <p>Email: {props.state.email}</p>
            <p> University: {props.state.university}</p>
            <p>Phone number: {props.state.phone}</p>
            <p>Student type: {props.state.studentType}</p>
            <p>Profile photo:</p>
            <img src={window.URL.createObjectURL(props.state.photo)} className="rounded-md mb-2 object-fill h-40 w-80"/>
      </div>
    );
}

export default FinalStep;