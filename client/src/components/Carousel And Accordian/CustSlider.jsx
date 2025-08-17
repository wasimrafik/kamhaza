"use client";
import React, { useEffect, useState } from "react";
import { Slider as PrimeSlider } from "primereact/slider";

const CustSlider = ({
  label,
  className = "",
  error = "",
  max = 100,
  disabled = false,
  ...props
}) => {
  const [value, setValue] = useState(
    props.value !== undefined ? props.value : 0
  );

  const handleChange = (e) => {
    if (disabled) return;
    setValue(e.value);
    props.onChange && props.onChange({ value: e.value });
  };

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  const position = typeof value === "number" ? (value / max) * 100 : 0;

  return (
    <div className={`flex flex-col gap-2 ${className} ${disabled ? "opacity-70" : ""}`}>
      {label && (
        <label className={`text-gray-700 font-medium ${disabled ? "cursor-not-allowed" : ""}`}>
          {label} {props?.required && <span className="text-red-400 relative -left-1"> *</span>}
        </label>
      )}

      <div className="relative pt-5 pb-2">
        <div
          className="absolute z-10"
          style={{
            left: `calc(${position}% - 12px)`,
            top: "0px",
            visibility: disabled ? "hidden" : "visible"
          }}
        >
          <div
            style={{
              backgroundColor: "#4F46E5",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              fontWeight: "bold",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              position: "relative",
              zIndex: 2
            }}
          >
            {typeof value === "number" ? value : ""}
          </div>
          <div
            style={{
              width: "0",
              height: "0",
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid #4F46E5",
              position: "absolute",
              left: "4px",
              top: "20px",
              zIndex: 1
            }}
          />
        </div>

        <PrimeSlider
          {...props}
          value={value}
          onChange={handleChange}
          className={`custom-slider ${disabled ? "cursor-not-allowed" : ""}`}
          max={max}
          disabled={disabled}
          style={{ height: "6px", borderRadius: "3px" }}
        />
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default CustSlider;
