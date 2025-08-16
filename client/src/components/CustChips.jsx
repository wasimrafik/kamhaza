"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chips } from "primereact/chips";
import { FloatLabel } from "primereact/floatlabel";
import { Tooltip } from "primereact/tooltip";

const CustChips = ({
  value,
  onChange,
  onAdd,
  onChipRemove,
  disabled = false,
  keyfilter,
  variant,
  invalid = false,
  className = "",
  label,
  head,
  description,
  readOnly = false,
  removeOnly = false,
  placeholder,
  max,
  inputRef,
  id = "cus-chips",
  style,
  error = "",
  required,
  info,
  maxLength,
  minLength = 0,
  minChipsLength = 0,
  useFloatLabel = false,
  validateType = "",
  uniqueOnly = true,
  count = 0,
  onInvalidKeyPress,
  ...rest
}) => {
  const inputRefElement = useRef(null);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (inputRefElement.current) {
      inputRefElement.current.maxLength = maxLength || 524288;
    }
  }, [maxLength]);

  const handleChange = (e) => {
    let newValue = e.value || [];

    if (removeOnly && newValue.length > value.length) return;

    if (removeOnly && newValue.length < value.length && onChipRemove) {
      const removedItem = value.find((item) => !newValue.includes(item));
      if (removedItem) onChipRemove(removedItem, newValue);
    }

    if (minLength > 0 && newValue?.length != minLength) return;

    if (minChipsLength > 0) {
      newValue = newValue.filter((item) => item.length >= minChipsLength);
    }

    if (keyfilter === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newValue = newValue.filter((item) => emailRegex.test(item));
    }

    if (uniqueOnly !== false) {
      newValue = [...new Set(newValue)];
    }

    onChange?.({ ...e, value: newValue });
  };

  const handleBlur = (e) => {
    if (removeOnly) {
      e.target.value = "";
      return;
    }

    const typedValue = e.target.value?.trim();
    if (!typedValue) return;

    if (minLength > 0 && typedValue?.length != minLength) return;

    let isValid = true;

    if (minChipsLength && typedValue.length < minChipsLength) isValid = false;

    if (keyfilter === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(typedValue)) isValid = false;
    }

    if (uniqueOnly && value.includes(typedValue)) isValid = false;

    if (isValid) {
      const newValue = [...value, typedValue];
      onChange?.({ ...e, value: newValue });
    }

    e.target.value = "";
    setInputError("");
  };

  const handleKeyPress = (e) => {
    if (removeOnly) {
      if (e.key !== 'Backspace' && e.key !== 'Delete') e.preventDefault();
      return;
    }

    if (keyfilter === "int" && onInvalidKeyPress) {
      if (
        e.key.length === 1 &&
        !/\d/.test(e.key) &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        onInvalidKeyPress(true);
        return;
      }
    }

    if (keyfilter !== "int" || maxLength !== 10) return;

    const currentValue = e.currentTarget.value;
    const isEnterKey = e.key === "Enter";
    const isMaxLength = currentValue.length === 10;
    const isExceeding = currentValue.length >= 10;

    if (isEnterKey && isMaxLength) {
      e.preventDefault();
      onChange?.({ target: e.currentTarget, value: [...new Set([...value, currentValue])] });
      e.currentTarget.value = "";
      setInputError("");
    } else if (isExceeding) {
      e.preventDefault();
      onInvalidKeyPress?.(false);
      setInputError("Mobile number can't exceed 10 digits. For more see info.");
    } else {
      setInputError("");
    }
  };

  const chipsElement = (
    <Chips
      id={id}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyPress}
      onAdd={onAdd}
      disabled={disabled}
      keyfilter={keyfilter}
      className={`chips-input overflow-y-auto custom-chips-token-margin ${invalid ? "p-invalid" : ""}`}
      variant={variant}
      readOnly={readOnly}
      placeholder={useFloatLabel || readOnly ? " " : (removeOnly ? "" : placeholder)}
      max={max}
      inputRef={inputRefElement}
      required={required}
      maxLength={maxLength}
      {...rest}
    />
  );

  return (
    <div className={`custom-chips-container w-full ${className}`} style={style}>
      <style>{`
        .custom-chips-token-margin .p-chips-token { margin-bottom: 4px; margin-top: 4px; margin-right: 4px; }
        .custom-chips-container .p-chips-input-token { order: 999; }
        .vmn-chips-container.custom-chips-container .p-chips { height: 100% !important; align-items: flex-start !important; }
        .vmn-chips-container.custom-chips-container .p-chips-multiple-container { align-items: flex-start !important; align-content: flex-start !important; min-height: auto !important; height: 100% !important; padding: 0 !important; gap: 4px !important; }
        .vmn-chips-container.custom-chips-container .p-inputtext { display: none !important; }
      `}</style>

      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <Tooltip className="text-xs" target=".custom-target-icon" />
          {head && <h4 className="chips-head !my-1">{head}</h4>}
          {required && <span className="text-red-500">*</span>}
          {info && (
            <span>
              <i
                className="!w-10 custom-target-icon pi pi-info-circle"
                data-pr-tooltip={info}
                data-pr-position="top"
              ></i>
            </span>
          )}
        </div>

        {count > 0 && <div className="text-sm">Added PEIDs count : {count}</div>}
      </div>

      {useFloatLabel ? (
        <FloatLabel>
          {chipsElement}
          {label && <label htmlFor={id}>{label}</label>}
        </FloatLabel>
      ) : (
        <div className="flex flex-col gap-1">
          {label && <label className="font-bold" htmlFor={id}>{label}</label>}
          {description && <p className="chips-description !my-0 text-sm">{description}</p>}
          {chipsElement}
        </div>
      )}

      {(error || inputError) && <small className="text-red-500">{error || inputError}</small>}
    </div>
  );
};

export default CustChips;
