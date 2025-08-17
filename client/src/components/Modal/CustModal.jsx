"use client";
import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import CustButtons from "../Button/CustButtons";
import { Tooltip } from "primereact/tooltip";

const CustModal = ({
  title,
  message,
  icon,
  visible,
  onClose,
  buttons,
  children,
  className = "w- max-w-[80%] sm:max-w-[50%]",
  blockScroll = true,
  info,
  ...rest
}) => {
  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [visible]);

  return (
    <Dialog
      header={
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <span className="text-[#3d4465]">{title}</span>
          {info && (
            <>
              <Tooltip target=".custom-target-icon" content={info} position="top" className="text-xs" />
              <span>
                <i className="custom-target-icon pi pi-info-circle"></i>
              </span>
            </>
          )}
        </div>
      }
      visible={visible}
      onHide={onClose}
      modal
      blockScroll={blockScroll}
      className={className}
      draggable={false}
      {...rest}
    >
      <div>
        <p className="text-gray-700">{message}</p>
      </div>
      <>{children}</>
      <div className={`flex gap-4 pt-4 justify-end ${rest?.btnContainerClass}`}>
        {(buttons || []).map((btn, index) => (
          <CustButtons
            key={index}
            label={btn.label}
            onClick={btn.onClick}
            styleType={btn.styleType}
            disabled={btn.disabled}
            style={btn.style}
          />
        ))}
      </div>
    </Dialog>
  );
};

export default CustModal;
