import React, { useState, useEffect, ElementType } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

function CreateCampaign(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(2);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 handleNext={handleNext} />;
      case 2:
        return <Step2 handleNext={handleNext} />;
      default:
        return <div>ssd</div>;
    }
  };

  return <div>{renderStep()}</div>;
}

export default CreateCampaign;
