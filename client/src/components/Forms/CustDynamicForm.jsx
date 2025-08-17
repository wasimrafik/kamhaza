// "use client";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import CustomDynamicInput from "../CustomInputsTypes/CustomDynamicInput";
import CustAutoComplete from "../AutoCompleteComponents/CustAutoComplete";
import CustInputSlider from "../CustomInputsTypes/CustInputSlider";
// ⬇️ Ensure this path points to the real slider component (not the same file as CustInputSlider)
import CustSlider from "../CarouselAndAccordian/CustSlider";
// import { zodResolver } from "@hookform/resolvers/zod"; // ⬅️ Add back later when you install zod + resolvers
import CustChips from "../CustChips";
import CustButton from "../CustButton";

const CustDynamicForm = ({
  formKey,                // ⬅️ use this instead of `key`
  id,
  fields = [],            // ✅ default to []
  formData = {},          // ✅ default to {}
  className,
  formSubmitHandler = () => {},
  onFieldChange,
  onFieldBlur,
  dependency = [],
  validations,            // zod schema (optional, for later)
  onValidityChange,
  validationTriggerCount = 0,
  btnClass,
  isChangeForm,
  label,
  fileChange,
  handleFileChange = () => {},
  autoSyncFields = [],
}) => {

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    defaultValues: { ...(formData || {}) },
    // ⬇️ When you add zod later, uncomment the import and this line:
    // ...(validations && { resolver: zodResolver(validations) }),
    mode: "all",
  });

  const formDataString = useMemo(() => JSON.stringify(formData || {}), [formData]);
  const formValues = getValues();

  // Keep specific fields in sync with external formData
  useEffect(() => {
    if (!autoSyncFields?.length) return;
    autoSyncFields.forEach((fieldName) => {
      if (
        formData?.[fieldName] !== undefined &&
        JSON.stringify(formData?.[fieldName]) !== JSON.stringify(getValues(fieldName))
      ) {
        setValue(fieldName, formData?.[fieldName]);
      }
    });
  }, [formData, setValue, getValues, autoSyncFields]);

  // Bubble up validity
  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  // External trigger
  useEffect(() => {
    if (validationTriggerCount > 0) trigger();
  }, [validationTriggerCount, trigger]);

  // Compute names of dependent fields once dependency is known
  const dependentFields = useMemo(() => {
    return dependency?.map?.((dep) => dep?.dependentOn).filter(Boolean) || [];
  }, [dependency]);

  // Watch dependent field values
  const dependentFieldValues = useWatch({ control, name: dependentFields });
  const prevValues = useRef({});

  // Reset dependent target fields when the driver fields change
  useEffect(() => {
    const hasChanged = JSON.stringify(prevValues.current) !== JSON.stringify(dependentFieldValues);
    if (!hasChanged) return;
    prevValues.current = dependentFieldValues;

    if (!Array.isArray(dependency) || dependency.length === 0) return;

    // If fileChange flag not set, call handleFileChange(false) and stop (matches your original logic)
    if (!fileChange) {
      handleFileChange(false);
      return;
    }

    dependency.forEach(({ dependentOn, field }) => {
      const currentValue = watch(dependentOn);

      // If the driver is empty (or empty object), clear targets
      const isEmptyObject = typeof currentValue === "object" && currentValue !== null && Object.keys(currentValue).length === 0;
      if (!currentValue || isEmptyObject) {
        (field || []).forEach((fieldName) => {
          onFieldChange?.(fieldName, "");
          setValue(fieldName, "");
        });
        return;
      }

      // Otherwise still clear targets (as per original code)
      (field || []).forEach((fieldName) => {
        onFieldChange?.(fieldName, "");
        setValue(fieldName, "");
      });
    });
  }, [dependentFieldValues, dependency, fileChange, handleFileChange, onFieldChange, setValue, watch]);

  const handleBlur = (fieldName) => {
    trigger(fieldName);
    onFieldBlur?.(fieldName);
  };

  const renderInputField = useCallback(
    (field, index) => {
      if (!field) return null;
      if (field.conditional && !field.conditional(formValues)) return null;

      return (
        <div key={index} className={`w-full ${field.hide ? "hidden" : ""} ${field?.className ?? ""}`}>
          <Controller
            control={control}
            name={field.name}
            rules={field.validation}
            render={({ field: inputField }) => {
              switch (field.type) {
                case "autocomplete":
                  return (
                    <CustAutoComplete
                      disabled={field.disabled}
                      label={field.label}
                      placeholder={field.placeholder}
                      fetchOptions={field.getOptions}
                      description={field?.description}
                      onOptionSelect={(selectedOption) => {
                        onFieldChange?.(field.name, selectedOption);
                        return inputField.onChange(selectedOption || "");
                      }}
                      debounceTime={field.debounceTime || 300}
                      inputSearch={(() => inputField?.value?.label || inputField?.value)()}
                      required={field.required}
                      error={errors?.[field?.name]?.message}
                      labelSize="md"
                      readOnly={field.readOnly}
                      onBlur={() => handleBlur(field.name)}
                    />
                  );

                case "toggle-group":
                  return (
                    <div className="grid grid-cols-2 gap-y-4">
                      {(field.toggleOptions || []).map((toggleOption, i) => (
                        <CustInputSlider
                          key={i}
                          checked={!!formValues?.[toggleOption?.name]}
                          onChange={(value) => {
                            const tgt = toggleOption?.name;
                            onFieldChange?.(tgt, value);
                            setValue(tgt, value);
                            handleBlur(tgt);
                          }}
                          name={toggleOption?.label}
                        />
                      ))}
                    </div>
                  );

                case "toggle":
                  return (
                    <CustInputSlider
                      checked={!!inputField?.value}
                      label={field?.label}
                      required={field?.required}
                      disabled={field.disabled}
                      description={field?.description}
                      onChange={(value) => {
                        inputField.onChange(value);
                        onFieldChange?.(field.name, value);
                        handleBlur(field.name);
                      }}
                      classnames={field?.classnames}
                    />
                  );

                case "slider":
                  return (
                    <CustSlider
                      label={field?.label}
                      onChange={(e) => {
                        const v = e?.value;
                        inputField.onChange(v);
                        onFieldChange?.(field.name, v);
                        handleBlur(field.name);
                      }}
                      value={inputField?.value}
                      required={field?.required}
                      error={errors?.[field?.name]?.message}
                      max={field?.max}
                      disabled={field.disabled}
                    />
                  );

                case "radio":
                  return (
                    <CustomDynamicInput
                      label={field.label}
                      type={field.type}
                      options={field?.options}
                      description={field?.description}
                      onChange={(e) => {
                        const v = Array.isArray(e) ? e[0] : e;
                        inputField.onChange(v);
                        onFieldChange?.(field?.name, v);
                        handleBlur(field.name);
                      }}
                      selectedOptions={inputField?.value ? [{ ...inputField?.value }] : []}
                      required={field.required}
                      invalid={!!errors?.[field?.name]}
                      error={errors?.[field?.name]?.message}
                      onBlur={() => handleBlur(field.name)}
                    />
                  );

                case "chips":
                  return (
                    <CustChips
                      value={inputField.value}
                      keyfilter={field?.keyfilter}
                      className="w-full"
                      onChange={(e) => {
                        const v = e?.value;
                        inputField?.onChange(v);
                        onFieldChange?.(field.name, v);
                        handleBlur(field.name);
                      }}
                      onChipRemove={field?.onChipRemove}
                      removeOnly={field?.removeOnly}
                      placeholder={field?.placeholder}
                      head={field?.head}
                      error={errors?.[field?.name]?.message}
                      required={field.required}
                      info={field?.info || undefined}
                      max={field.max}
                      disabled={field?.disabled}
                      maxLength={field.maxLength}
                      inputRef={field.inputRef}
                      minChipsLength={field.minChipsLength}
                      pt={field?.pt || { container: "w-full max-h-40 overflow-y-auto" }}
                      description={field?.description}
                      label={field?.label}
                      count={field?.count}
                      onBlur={() => handleBlur(field.name)}
                    />
                  );

                case "file":
                  return (
                    <CustomDynamicInput
                      description={field?.description}
                      type="file"
                      label={field?.label}
                      size={field?.size}
                      resolution={field?.resolution}
                      fileTypes={field?.fileTypes}
                      value={inputField?.value}
                      onChange={(event) => {
                        inputField.onChange(event);
                        onFieldChange?.(field.name, event, true);
                        handleBlur(field.name);
                      }}
                    />
                  );

                case "custom": {
                  const Component = field.component;
                  return (
                    <Component
                      {...(field.props && field.props)}
                      value={inputField.value}
                      onChange={inputField.onChange}
                      invalid={!!errors?.[field?.name]}
                      error={errors?.[field?.name]?.message}
                      required={field.required}
                      label={field.label}
                      placeholder={field.placeholder}
                      name={field.name}
                    />
                  );
                }

                case "dropdown":
                  return (
                    <CustomDynamicInput
                      {...field}
                      value={inputField?.value}
                      onChange={(e) => {
                        const value = e?.target?.value ?? e?.value ?? e;
                        inputField.onChange(e);
                        onFieldChange?.(field.name, value);
                      }}
                      onBlur={() => {
                        field.onBlur?.();
                        handleBlur(field.name);
                      }}
                      invalid={!!errors?.[field?.name] || !!field?.error}
                      error={errors?.[field?.name]?.message || field?.error}
                      required={field.required}
                    />
                  );

                default:
                  return (
                    <CustomDynamicInput
                      {...field}
                      value={inputField?.value}
                      onChange={(e) => {
                        if (field.label?.toLowerCase() === "channels") {
                          let value = e?.target?.value ?? e?.value ?? e;
                          value = (value || []).map((ch) => ({ id: ch, label: ch, disabled: ch === "SMS" }));
                          inputField.onChange(value);
                          onFieldChange?.(field.name, value);
                        } else {
                          const value = e?.target?.value ?? e?.value ?? e;
                          inputField.onChange(e);
                          onFieldChange?.(field.name, value);
                        }
                      }}
                      invalid={!!errors?.[field?.name] || !!field?.error}
                      error={errors?.[field?.name]?.message || field?.error}
                      required={field.required}
                      info={field?.info || undefined}
                      filter={field.filter}
                      filterPlaceholder={field.filterPlaceholder}
                      maxLength={field.maxLength || field?.limit}
                      minlength={field.minlength}
                      keyfilter={field.keyfilter}
                      className={field?.className}
                      timeOnly={field.timeOnly}
                      showTime={field.showTime}
                      description={field?.description}
                      {...(field?.header && { header: field?.header })}
                      itemTemplate={field?.itemTemplate}
                      pt={field?.pt}
                      disabled={field?.disabled}
                      display={field?.display}
                      onBlur={() => {
                        field.onBlur?.();
                        handleBlur(field.name);
                      }}
                    />
                  );
              }
            }}
          />
        </div>
      );
    },
    [formValues, control, errors, onFieldChange, setValue, watch]
  );

  const isFirstRender = useRef(true);
  const lastFormDataRef = useRef(formData || {});

  // Detect meaningful external formData changes and reset
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastFormDataRef.current = formData || {};
      return;
    }

    const currentValues = getValues();
    const safeFormData = formData || {};
    const safeLastData = lastFormDataRef.current || {};

    const hasSignificantChange =
      Object.keys(safeFormData).length !== Object.keys(safeLastData).length ||
      Object.keys(safeFormData).some((key) => {
        const oldValue = safeLastData[key];
        const newValue = safeFormData[key];
        const currentValue = currentValues[key];
        return oldValue !== newValue && currentValue !== newValue && !(oldValue === "" && newValue === currentValue);
      });

    if (hasSignificantChange) reset(safeFormData);
    lastFormDataRef.current = safeFormData;
  }, [formDataString, getValues, reset, formData]);

  // When isChangeForm toggles, force reset to incoming formData
  useEffect(() => {
    reset({ ...(formData || {}) });
  }, [isChangeForm, reset, formData]);

  const renderedFields = useMemo(
    () => (Array.isArray(fields) ? fields.map((field, i) => renderInputField(field, i)) : []),
    [fields, renderInputField]
  );

  return (
    <form key={formKey} id={id} onSubmit={handleSubmit(formSubmitHandler)} className={className}>
      {renderedFields}
      {label && (
        <div className={`mt-6 ${btnClass || ""}`}>
          <CustButton label={label} />
        </div>
      )}
    </form>
  );
};

export default CustDynamicForm;
