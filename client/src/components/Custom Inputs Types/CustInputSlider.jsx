"use client";
import React from "react";
import { InputSwitch } from "primereact/inputswitch";

const CustInputSlider = ({
  checked,
  onChange,
  labeledBy,
  disabled = false,
  className = "",
  label = "",
  name = "",
  required,
  description = "",
  classnames = ""
}) => {
  return (
    <div className={classnames}>
      <div>
        {label && (
          <span className="font-semibold">
            {label}
            {required && <span className="text-red-500">*</span>}
          </span>
        )}
        {description && <div className="text-sm text-gray-500">{description}</div>}
      </div>

      <div className="flex items-center gap-2">
        <InputSwitch
          className={className}
          checked={checked}
          onChange={(e) => onChange(e.value)}
          disabled={disabled}
          aria-labelledby={labeledBy}
          required={required}
        />
        {name && <span>{name}</span>}
      </div>
    </div>
  );
};

export default CustInputSlider;
