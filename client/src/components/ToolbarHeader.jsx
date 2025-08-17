"use client";
import React from "react";
import { InputText } from "primereact/inputtext";
import CustButtons from "@/ui-components/Button/CustButtons";
import CustMultiSelect from "@/ui-components/CustMultiSelect/CustMultiSelect";

const ToolbarHeader = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  selectedChannels,
  channelOptions,
  onChannelChange,
  onNewCampaign,
  onRefresh,
  onFilter,
  onMenu,
  newCampaignLabel = "+ New Campaign",
  className = ""
}) => {
  return (
    <div className={`w-full flex items-center justify-between gap-4 px-4 py-3 bg-white border-b border-gray-200 ${className}`}>
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm z-10"></i>
          <InputText
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10 pr-4 py-2.5 w-80 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>

        <div className="w-48">
          <CustMultiSelect
            options={channelOptions}
            selectedValues={selectedChannels}
            onChange={onChannelChange}
            placeholder="Channels"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <CustButtons
          label={newCampaignLabel}
          styleType="primary"
          onClick={onNewCampaign}
          className="px-4 py-2.5 text-sm font-medium whitespace-nowrap"
        />

        <button
          onClick={onRefresh}
          className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-400 transition-all duration-200"
          title="Refresh"
        >
          <i className="pi pi-refresh text-sm"></i>
        </button>

        <button
          onClick={onFilter}
          className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-400 transition-all duration-200"
          title="Filter"
        >
          <i className="pi pi-filter text-sm"></i>
        </button>

        <button
          onClick={onMenu}
          className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-400 transition-all duration-200"
          title="More options"
        >
          <i className="pi pi-bars text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default ToolbarHeader;
