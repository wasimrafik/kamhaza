"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const CustAccordian = ({ className, activeIndex: propActiveIndex, multiple, tabs }) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(
    propActiveIndex !== undefined ? propActiveIndex : multiple ? Array.from({ length: tabs.length }, (_, i) => i) : 0
  );

  useEffect(() => {
    if (propActiveIndex !== undefined) {
      setInternalActiveIndex(propActiveIndex);
    } else if (multiple && propActiveIndex === undefined) {
      setInternalActiveIndex(Array.from({ length: tabs.length }, (_, i) => i));
    }
  }, [propActiveIndex, multiple, tabs.length]);

  return (
    <div className={`card ${className}`}>
      <Accordion activeIndex={internalActiveIndex} multiple={multiple} className="space-y-4">
        {tabs.map((tab, idx) => (
          <AccordionTab
            key={idx}
            header={tab.header}
            pt={{ headerIcon: { className: "hidden" } }}
          >
            <div className="m-0 p-0">{tab.content}</div>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
};

export default CustAccordian;
