"use client";
import React, { useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { classNames } from "primereact/utils";

const CustomOverlayPanel = ({ children, className, style, triggerElement }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((v) => !v);

  return (
    <OverlayPanel
      ref={triggerElement}
      dismissable
      className={classNames("p-overlaypanel", className)}
      style={style}
      showCloseIcon={false}
      onShow={toggleVisibility}
      onHide={toggleVisibility}
    >
      <div className="w-[350px] overflow-auto p-p-4">{children}</div>
    </OverlayPanel>
  );
};

export default CustomOverlayPanel;
