"use client";
import React from "react";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";

const CustCheckboxRadio = ({
  options,
  selectedOptions,
  onChange,
  layout = "vertical",
  disabled = false,
  className = "",
  type = "checkbox",
}) => {
  const handleChange = (option) => {
    let updatedOptions = [...selectedOptions];

    if (type === "checkbox") {
      const exists = updatedOptions.some((o) => o.value === option.value);
      if (exists) {
        updatedOptions = updatedOptions.filter((o) => o.value !== option.value);
      } else {
        updatedOptions.push(option);
      }
    } else {
      updatedOptions = [option];
    }
    onChange(updatedOptions);
  };

  return (
    <div className={`flex ${layout === "horizontal" ? "flex-row gap-4" : "flex-col gap-2"} ${className}`}>
      {(options || []).map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          {type === "checkbox" ? (
            <Checkbox
              inputId={`checkbox-${option.value}`}
              value={option.value}
              checked={selectedOptions?.some?.((o) => o.value === option.value)}
              onChange={() => handleChange(option)}
              disabled={disabled || option.disabled}
            />
          ) : (
            <RadioButton
              inputId={`radio-${option.value}`}
              value={option.value}
              checked={selectedOptions?.some?.((o) => o.value === option.value)}
              onChange={() => handleChange(option)}
              disabled={disabled || option.disabled}
            />
          )}
          <label
            htmlFor={type === "checkbox" ? `checkbox-${option.value}` : `radio-${option.value}`}
            className="text-gray-800 cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CustCheckboxRadio;
