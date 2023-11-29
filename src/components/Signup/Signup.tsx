import React from "react";
import { Steps, Step } from "react-step-builder";
import NameStep from "./NameStep";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";
import UniStep from "./UniStep";
import PhoneStep from "./PhoneStep";
import VerificationStep from "./VerificationStep";
import FinalStep from "./FinalStep";
import StudentStep from "./StudentStep";
import PhotoStep from "./PhotoStep";

function Signup() {
  return (
    <div className="App">
      <Steps>
        <Step component={NameStep} />
        <Step component={EmailStep} />
        <Step component={PasswordStep} />
        <Step component={UniStep} />
        <Step component={StudentStep} />
        <Step component={PhotoStep} />
        <Step component={PhoneStep} />
        <Step component={VerificationStep} />
        <Step component={FinalStep} />
      </Steps>
    </div>
  );
}

export default Signup;