import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import CustButton from "../CustButton";

const CustCalendar = ({
  value,
  onChange,
  mode = "time",
  showTime = false,
  hourFormat = "24",
  showIcon = true,
  inline = false,
  range = false,
  minDate,
  maxDate,
  dateFormat = "dd/mm/yy",
  placeholder = "Select Date",
  className = "",
  manualInput = true,
  readOnlyInput = true,
  onCancel,
  onSet,
  showButtons = false,
  inputClassName = "",
  timeOnly,
  showDefaultValue = true,
  label,
  description
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tempDate, setTempDate] = useState(null);
  const calendarRef = useRef(null);

  const getDefaultDate = () => {
    if (!showDefaultValue) return null;
    const today = new Date();
    if (showTime) {
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hourFormat === "12" ? today.getHours() % 12 || 12 : today.getHours(),
        today.getMinutes()
      );
    }
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const getDefaultDateRange = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0);
    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hourFormat === "12" ? today.getHours() % 12 || 12 : today.getHours(),
      today.getMinutes()
    );
    return [start, end];
  };

  useEffect(() => {
    const isDate = value instanceof Date;
    const isTimeString = typeof value === 'string' && /^\d{2}:\d{2}$/.test(value);

    if (value === undefined) {
      setSelectedDate(null);
      setTempDate(null);
    } else if (!value) {
      const defaultValue = range ? getDefaultDateRange() : getDefaultDate();
      setSelectedDate(defaultValue);
      setTempDate(defaultValue);
      onChange(defaultValue);
    } else if (!isDate && isTimeString) {
      const [hours, minutes] = value.split(':').map(Number);
      const newDate = new Date();
      newDate.setHours(hours, minutes, 0, 0);
      setSelectedDate(newDate);
      setTempDate(newDate);
      onChange(newDate);
    } else {
      setSelectedDate(value);
      setTempDate(value);
    }
  }, [value]);

  const getView = () => {
    switch (mode) {
      case "date":
      case "month":
      case "year":
        return mode;
      default:
        return "date";
    }
  };

  const handleDateChange = (e) => {
    if (showButtons) {
      setTempDate(e.value);
    } else {
      setSelectedDate(e.value);
      onChange(e.value);
      if (range && Array.isArray(e.value) && e.value.length === 2 && e.value[0] && e.value[1]) {
        if (calendarRef.current) calendarRef.current.hide();
      }
    }
  };

  const handleSet = () => {
    setSelectedDate(tempDate);
    onChange(tempDate);
    if (calendarRef.current) calendarRef.current.hide();
    onSet?.(tempDate);
  };

  return (
    <div className={`custom-Calender ${className}`}>
      <Calendar
        ref={calendarRef}
        value={showButtons ? tempDate : selectedDate}
        onChange={handleDateChange}
        timeOnly={timeOnly}
        showTime={showTime}
        hourFormat={hourFormat}
        inputClassName={inputClassName}
        showIcon={showIcon}
        inline={inline}
        selectionMode={range ? 'range' : 'single'}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat={dateFormat}
        placeholder={placeholder}
        disabled={!manualInput}
        readOnlyInput={readOnlyInput}
        view={getView()}
        className="flex"
        footerTemplate={() =>
          showTime ? (
            <div className="flex justify-end gap-2 m-2">
              <CustButton
                label="Cancel"
                className="p-button-outlined p-button-secondary hidden"
                onClick={onCancel}
              />
              <CustButton
                label="Set"
                className="p-button-primary"
                onClick={handleSet}
              />
            </div>
          ) : (
            <></>
          )
        }
      />
    </div>
  );
};

export default CustCalendar;
