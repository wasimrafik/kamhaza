"use client";
import React, { useRef } from "react";
import CustomDynamicInput from "../CustomDynamicInput";
import { Menu } from "primereact/menu";

const CustTableFilterHeader = (props) => {
  const menuOpen = useRef(null);

  const handleIconClick = (event) => {
    menuOpen?.current?.toggle(event);
  };

  const checkboxOptions = props.options || [];

  const items = [
    {
      template: () => (
        <div className="p-2">
          <CustomDynamicInput
            type="checkbox"
            options={checkboxOptions}
            selectedOptions={props?.filters?.[props?.header] || []}
            onChange={(selected) => {
              if (props.onFilterChange) {
                props.onFilterChange(selected, props.header);
              }
            }}
            className="flex flex-col"
          />
        </div>
      )
    }
  ];

  return (
    <div className="flex items-center gap-3 justify-between">
      <span>{props.header}</span>
      <span onClick={handleIconClick}>
        <i className="pi pi-filter !cursor-pointer"></i>
      </span>
      <Menu model={items} popup ref={menuOpen} id="popup_menu_left" popupAlignment="right" />
    </div>
  );
};

export default CustTableFilterHeader;
