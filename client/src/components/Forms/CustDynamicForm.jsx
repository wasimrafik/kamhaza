"use client";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import CustomDynamicInput from "../CustomDynamicInput";
import CustAutoComplete from "../Autocomplete/CustAutoComplete";
import CustInputSlider from "../CusInputSlider/CustInputSlider";
import CustSlider from "../CusSlider/CustSlider";
import { zodResolver } from "@hookform/resolvers/zod";
import CustButtons from "../Button/CustButtons";
import CustChips from "../CusChips/CustChips";

const CustDynamicForm = ({
  key,
  id,
  fields,
  formData,
  className,
  formSubmitHandler = () => {},
  onFieldChange,
  onFieldBlur,
  dependency = [],
  validations,
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
    defaultValues: { ...formData },
    ...(validations && { resolver: zodResolver(validations) }),
    mode: "all",
  });

  const formDataString = useMemo(() => JSON.stringify(formData), [formData]);
  const formValues = getValues();

  useEffect(() => {
    if (!autoSyncFields.length) return;
    autoSyncFields.forEach((fieldName) => {
      if (
        formData[fieldName] !== undefined &&
        JSON.stringify(formData[fieldName]) !== JSON.stringify(getValues(fieldName))
      ) {
        setValue(fieldName, formData[fieldName]);
      }
    });
  }, [formData, setValue, getValues, autoSyncFields]);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    validationTriggerCount > 0 && trigger();
  }, [validationTriggerCount]);

  const dependentFields = useMemo(() => {
    return dependency?.map?.((dep) => dep.dependentOn) || [];
  }, []);

  const dependentFieldValues = useWatch({ control, name: dependentFields });
  const prevValues = useRef({});

  useEffect(() => {
    const hasChanged = JSON.stringify(prevValues.current) !== JSON.stringify(dependentFieldValues);
    if (!hasChanged) return;
    prevValues.current = dependentFieldValues;

    if (!dependency?.length) return;

    if (!fileChange) {
      handleFileChange(false);
      return;
    }

    dependency.forEach(({ dependentOn, field }) => {
      const currentValue = watch(dependentOn);

      if (!currentValue || (typeof currentValue === "object" && Object.keys(currentValue).length === 0)) {
        field.forEach((fieldName) => {
          onFieldChange?.(fieldName, "");
          setValue(fieldName, "");
        });
        return;
      }

      field.forEach((fieldName) => {
        onFieldChange?.(fieldName, "");
        setValue(fieldName, "");
      });
    });
  }, [dependentFieldValues]);

  const handleBlur = (fieldName) => {
    trigger(fieldName);
    onFieldBlur?.(fieldName);
  };

  const renderInputField = useCallback(
    (field, index) => {
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
                      {field.toggleOptions.map((toggleOption, i) => (
                        <CustInputSlider
                          key={i}
                          checked={formValues[toggleOption.name]}
                          onChange={(value) => {
                            onFieldChange?.(toggleOption.name, value);
                            setValue(toggleOption.name, value);
                            handleBlur(toggleOption.name);
                          }}
                          name={toggleOption?.label}
                        />
                      ))}
                    </div>
                  );

                case "toggle":
                  return (
                    <CustInputSlider
                      checked={inputField?.value}
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
                        inputField.onChange(e.value);
                        onFieldChange?.(field.name, e.value);
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
                        inputField.onChange(e[0]);
                        onFieldChange?.(field?.name, e[0]);
                        handleBlur(field.name);
                      }}
                      selectedOptions={[{ ...inputField?.value }]}
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
                        inputField?.onChange(e.value);
                        onFieldChange?.(field.name, e.value);
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

                case "custom":
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
                        if (field.label?.toLowerCase() === 'channels') {
                          let value = e?.target?.value ?? e?.value ?? e;
                          value = value.map((ch) => ({ id: ch, label: ch, disabled: ch === 'SMS' }));
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
  const lastFormDataRef = useRef(formData);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastFormDataRef.current = formData;
      return;
    }

    const currentValues = getValues();
    const hasSignificantChange =
      Object.keys(formData).length !== Object.keys(lastFormDataRef.current).length ||
      Object.keys(formData).some((key) => {
        const oldValue = lastFormDataRef.current[key];
        const newValue = formData[key];
        const currentValue = currentValues[key];
        return oldValue !== newValue && currentValue !== newValue && !(oldValue === '' && newValue === currentValue);
      });

    if (hasSignificantChange) reset(formData);
    lastFormDataRef.current = formData;
  }, [formDataString, getValues, reset]);

  useEffect(() => {
    reset({ ...formData });
  }, [isChangeForm]);

  const renderedFields = useMemo(() => fields.map((field, i) => renderInputField(field, i)), [fields, renderInputField]);

  return (
    <form key={key} id={id} onSubmit={handleSubmit(formSubmitHandler)} className={className}>
      {renderedFields}
      {label && (
        <div className="mt-6">
          <CustButtons label={label} />
        </div>
      )}
    </form>
  );
};

export default CustDynamicForm;
