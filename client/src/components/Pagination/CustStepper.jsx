"use client";
import React, { useState } from "react";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";

const CustStepper = ({ steps, onStepChange, validate, handleReset, handleSubmitForm, isEditMore = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = async () => {
    if (activeIndex === steps.length - 1) {
      handleSubmitForm?.();
    } else {
      const isValid = validate?.(activeIndex);
      if (activeIndex < steps.length - 1 && isValid) {
        setTimeout(() => {
          setActiveIndex(activeIndex + 1);
          onStepChange && onStepChange(activeIndex + 1);
        }, 100);
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex === 3) {
      handleReset?.();
      setActiveIndex(0);
      onStepChange?.(0);
    } else if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      onStepChange && onStepChange(activeIndex - 1);
    }
  };

  return (
    <>
      <Steps
        model={steps.map((step) => ({ label: step.label }))}
        activeIndex={activeIndex}
        onSelect={(e) => {
          setActiveIndex(e.index);
          onStepChange && onStepChange(e.index);
        }}
      />

      <div className="p-4 mt-4 border border-gray-300 rounded-md">
        {steps[activeIndex].content}
      </div>

      <div className="flex justify-between mt-4">
        <Button
          label={activeIndex === 3 ? "Reset" : "Previous"}
          icon={activeIndex === 3 ? "" : "pi pi-arrow-left"}
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`p-button-outlined ${activeIndex === 3 && isEditMore ? "hidden" : ""}`}
        />
        <Button
          label={
            activeIndex === steps.length - 1
              ? isEditMore
                ? "Update user"
                : "Create User"
              : "Next"
          }
          icon={activeIndex === steps.length - 1 ? "" : "pi pi-arrow-right"}
          onClick={handleNext}
          className="p-button-primary"
        />
      </div>
    </>
  );
};

export default CustStepper;
