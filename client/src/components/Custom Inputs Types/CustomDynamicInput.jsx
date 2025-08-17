"use client";
import React from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import CustCalendar from "./Calendar/CustCalendar";
import CustCheckboxRadio from "./CheckboxRadio/CustCheckboxRadio";
import { InputTextarea } from "primereact/inputtextarea";
import { Tooltip } from "primereact/tooltip";
import CustFileUpload from "./CustFileUpload/CustFileUpload";
import { Checkbox } from "primereact/checkbox";

const CustomDynamicInput = (props) => {
  const {
    label,
    description,
    error,
    invalid,
    leftIcon,
    rightIcon,
    className,
    disabled,
    required,
    info
  } = props;

  const renderInput = () => {
    switch (props.type) {
      case "number":
        return (
          <InputNumber
            value={props.value}
            onValueChange={(e) => props.onChange?.(e.value ?? null)}
            className={classNames("w-full", { "p-invalid": invalid }, className)}
            placeholder={props.placeholder}
            required={props.required}
          />
        );

      case "password": {
        const header = props.createPassword ? <div className="font-bold mb-3">Pick a password</div> : undefined;
        const footer = props.createPassword ? (
          <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
            </ul>
          </>
        ) : undefined;

        return (
          <div>
            <Password
              value={props.value}
              onChange={props.onChange}
              onBlur={props.onBlur}
              toggleMask
              feedback={props.createPassword}
              header={header}
              footer={footer}
              className={classNames("w-full", { "p-invalid": invalid }, props?.className)}
              placeholder={props.placeholder}
              required={props.required}
              autoComplete="new-off"
              disabled={props.disabled}
              pt={{
                root: { className: "w-full block", style: { display: "block", width: "100%" }, ...(props.pt?.root || {}) },
                input: { className: "w-full", ...(props.pt?.input || {}) },
                panel: { style: { minWidth: "300px", width: "auto" }, ...(props.pt?.panel || {}) },
                iconField: { className: "w-full", ...(props.pt?.iconField || {}) },
                hideIcon: { className: "cursor-pointer" },
                showIcon: { className: "cursor-pointer" },
                ...(props.pt || {})
              }}
              inputClassName="w-full"
            />
          </div>
        );
      }

      case "text":
      case "email":
        return (
          <InputText
            value={props.value}
            onChange={props.onChange}
            className={classNames("w-full", { "p-invalid": invalid }, className)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            minLength={props.minlength}
            disabled={props.disabled}
            required={props.required}
            keyfilter={props.keyfilter}
            name={props.name}
            onBlur={props.onBlur}
          />
        );

      case "textarea":
        return (
          <InputTextarea
            value={props.value}
            onChange={props.onChange}
            className={classNames("p-inputtext w-full", { "p-invalid": invalid }, className)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            minLength={props.minlength}
            required={props.required}
            onBlur={props.onBlur}
          />
        );

      case "date":
        return (
          <CustCalendar
            {...props}
            value={props.value ?? null}
            onChange={(e) => props?.onChange?.(e ?? null)}
            hourFormat="24"
            className={classNames("w-full", { "p-invalid": invalid }, className)}
            inputClassName={props?.inputClassName}
            showDefaultValue={props?.showDefaultValue}
          />
        );

      case "file":
        return (
          <CustFileUpload
            allowedFileTypes={props?.fileTypes}
            value={props.value}
            maxSizeInMB={props?.size}
            resolution={props?.resolution}
            currentFile={props?.value}
            onFileSelect={props?.onChange}
          />
        );

      case "dropdown":
        return (
          <Dropdown
            value={props.value}
            options={props.options}
            onChange={props.onChange}
            className={classNames("w-full border border-gray-300 ", { "p-invalid": invalid }, className)}
            placeholder={props.placeholder}
            required={props.required}
            disabled={props?.disabled || props?.readOnly}
            {...(props?.showClear && { showClear: props?.showClear })}
            {...(props?.filter && { filter: props?.filter })}
            {...(props?.filterPlaceholder && { filterPlaceholder: props?.filterPlaceholder })}
            pt={props?.pt || {}}
            {...(props?.itemTemplate && { itemTemplate: props?.itemTemplate })}
            onBlur={props.onBlur}
            appendTo="self"
          />
        );

      case "multiselect": {
        const allSelected = !!(props.value && props.options && Array.isArray(props.value) && Array.isArray(props.options) && props.value.length === props.options.length);
        const toggleAll = () => {
          if (props.onChange) {
            if (allSelected) props.onChange([]);
            else props.onChange([...props.options]);
          }
        };
        const customPanelHeader = () => (
          <div className="flex items-center bg-gray-100 border border-solid border-0 !border-b-2 !border-gray-200 gap-2 p-4 px-5">
            <Checkbox checked={allSelected} onChange={toggleAll} />
            <span className="font-semibold ">All</span>
          </div>
        );

        return (
          <MultiSelect
            value={props?.label?.toLowerCase() === "channels" ? props?.value?.map((item) => item.id) : props?.value}
            options={props.options}
            onChange={props.onChange}
            className={classNames("w-full", { "p-invalid": invalid }, className)}
            placeholder={props.placeholder}
            filter={props.filter}
            disabled={props.disabled || props.readOnly}
            required={props.required}
            filterPlaceholder={props.filterPlaceholder}
            panelHeaderTemplate={props?.showSelectAll ? customPanelHeader : props?.panelHeaderTemplate}
            {...(props?.itemTemplate && { itemTemplate: props?.itemTemplate })}
            {...(props?.pt && { pt: props?.pt })}
            {...(!props?.header && { pt: { header: "hidden" } })}
            display={props?.display}
            optionLabel="label"
            optionValue={props?.label?.toLowerCase() === "channels" ? "id" : "value"}
          />
        );
      }

      case "checkbox":
        return (
          <CustCheckboxRadio
            {...props}
            type="checkbox"
            options={props.options ?? null}
            onChange={(e) => props.onChange?.(e ?? null)}
            layout={props?.layout}
            selectedOptions={props.selectedOptions}
          />
        );

      case "radio":
        return (
          <CustCheckboxRadio
            {...props}
            type="radio"
            options={props.options ?? null}
            onChange={(e) => props.onChange?.(e ?? null)}
            layout="horizontal"
          />
        );

      default:
        return <InputText autoComplete="new-item" className={`w-full ${className}`} />;
    }
  };

  return (
    <>
      <Tooltip target=".custom-target-icon" className="text-xs" />

      {label && (
        <label className={`font-bold block mb-1 ${props?.className}`}>
          {label} {required && <span className="text-red-400 relative -left-1">*</span>}
          {info && (
            <span>
              <i className="!w-10 custom-target-icon pi pi-info-circle" data-pr-tooltip={info} data-pr-position="top"></i>
            </span>
          )}
        </label>
      )}

      {description && <small className="font-medium text-sm block mb-1">{description}</small>}

      {leftIcon && rightIcon && (
        <div className="flex flex-col">
          <IconField className={classNames("p-icon-field-left w-full", className)}>
            {leftIcon && <InputIcon className={`pi pi-${leftIcon} z-5`}></InputIcon>}
            {renderInput()}
            {rightIcon && <InputIcon style={{ cursor: "pointer" }} className={`pi pi-${rightIcon} z-5`}></InputIcon>}
          </IconField>
        </div>
      )}
      {leftIcon && !rightIcon && (
        <div className="flex flex-col">
          <IconField iconPosition="left" className={classNames("w-full", className)}>
            {leftIcon && <InputIcon className={`pi pi-${leftIcon} z-5`}></InputIcon>}
            {renderInput()}
          </IconField>
        </div>
      )}
      {!leftIcon && rightIcon && (
        <div className="flex flex-col">
          <IconField className={classNames("w-full", className)}>
            {rightIcon && <InputIcon style={{ cursor: "pointer" }} className={`pi pi-${rightIcon} z-5`}></InputIcon>}
            {renderInput()}
          </IconField>
        </div>
      )}
      {!leftIcon && !rightIcon && <div className="flex flex-col">{renderInput()}</div>}

      {(props?.limit || props?.variable) && (
        <div className="flex justify-between text-sm ">
          <div>
            {props?.limit && props?.value?.length > 1 && <p className="m-0 p-0">{props?.value?.length}/{props?.limit}</p>}
          </div>
          <div>
            {props?.variable && (
              <p
                className="m-0 p-0 cursor-pointer"
                onClick={() => {
                  if (props.type === "text" || props.type === "textarea") {
                    const currentValue = props?.value || "";
                    const isTitle = props?.label === "Title";
                    const variablePattern = isTitle ? /\[custom_param_text_\d+\]/g : /\[custom_param_desc_\d+\]/g;
                    const existingVariables = currentValue.match(variablePattern) || [];
                    const nextNumber = existingVariables.length + 1;
                    const newVariable = isTitle ? `[custom_param_text_${nextNumber}]` : `[custom_param_desc_${nextNumber}]`;
                    if ((currentValue + newVariable).length > (props.limit ?? Infinity)) return;
                    props.onChange?.({ target: { value: currentValue + newVariable } });
                  }
                }}
              >
                + variable
              </p>
            )}
          </div>
        </div>
      )}
      {invalid && <small className="text-red-500">{error}</small>}
    </>
  );
};

export default CustomDynamicInput;
