"use client";
import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

const CustTabView = ({ data, activeId, onTabChange, storageKey, headerElement, className }) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    if (activeId !== undefined) return activeId;
    if (storageKey) {
      const savedIndex = localStorage.getItem(`tabActiveIndex_${storageKey}`);
      return savedIndex ? parseInt(savedIndex) : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (activeId !== undefined) setActiveIndex(activeId);
  }, [activeId]);

  const handleTabChange = (e) => {
    setActiveIndex(e.index);
    if (storageKey) localStorage.setItem(`tabActiveIndex_${storageKey}`, e.index.toString());
    onTabChange?.(e);
  };

  return (
    <div className="relative">
      {headerElement && <div className="absolute right-0 top-0 z-10">{headerElement}</div>}
      <TabView
        pt={{ panelContainer: { className: "px-0" }, nav: { className: "pr-32" } }}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        renderActiveOnly
      >
        {data.map((tab, index) => (
          <TabPanel key={index} header={tab.label} className={className}>
            <div>{tab.content}</div>
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default CustTabView;
