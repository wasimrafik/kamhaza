"use client";
import React from "react";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";

const PasswordInput = ({
  leftIcon = "",
  label,
  description,
  error,
  value,
  onChange,
  placeholder = "Enter password",
  toggleMask = true,
  feedback = true,
  weakLabel = "Weak",
  mediumLabel = "Medium",
  strongLabel = "Strong",
  inputClassName = "",
  disabled = false,
  ...props
}) => {
  return (
    <>
      {label && <label className="font-bold block mb-1">{label}</label>}
      {description && <small className="font-medium text-sm block mb-1">{description}</small>}

      <div className="w-full flex flex-column">
        <IconField iconPosition="left" className="w-full">
          <InputIcon className={`pi pi-${leftIcon ? leftIcon : "lock"} ${leftIcon ? "z-5" : "z-0"}`} />
          <Password
            {...props}
            inputClassName="w-full"
            inputStyle={{ paddingLeft: `${leftIcon ? "2.5rem" : "0.75rem"}` }}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            toggleMask={toggleMask}
            feedback={feedback}
            promptLabel="Enter a password"
            weakLabel={weakLabel}
            mediumLabel={mediumLabel}
            strongLabel={strongLabel}
            disabled={disabled}
            className={classNames(inputClassName, "w-full flex flex-col")}
          />
      </IconField>
      </div>

      {error && <small className="text-red-500">{error}</small>}
    </>
  );
};

export default PasswordInput;
