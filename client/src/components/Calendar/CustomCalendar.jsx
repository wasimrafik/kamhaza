"use client";
import React from "react";
import { Calendar } from "primereact/calendar";
import { formatDate } from "@/utils/DateUtils";

const CustomCalendar = ({
  value,
  onChange,
  minDate = new Date("2023-05-01"),
  maxDate = new Date(),
  showFooter = true,
  style
}) => {
  return (
    <Calendar
      style={style}
      value={value}
      onChange={onChange}
      selectionMode="range"
      hideOnRangeSelection
      minDate={minDate}
      maxDate={maxDate}
      footerTemplate={
        showFooter
          ? () => (
              <div className="calendar-footer">
                <hr />
                <div className="flex justify-between text-[small] text-[#212529] px-[7px] py-[3px]">
                  <label htmlFor="fromDate">From:</label>
                  <span>{formatDate(value[1])}</span>
                </div>
                <hr />
                <div className="flex justify-between text-[small] text-[#212529] px-[7px] py-[3px]">
                  <label htmlFor="toDate">To:</label>
                  <span>{formatDate(value[1])}</span>
                </div>
              </div>
            )
          : undefined
      }
    />
  );
};

export default CustomCalendar;
