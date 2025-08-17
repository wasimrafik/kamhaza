"use client";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Toast } from "primereact/toast";

const CustToast = forwardRef((_, ref) => {
  const toastRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showToast: (message, severity = "info", summary = severity.charAt(0).toUpperCase() + severity.slice(1), life = 3000) => {
      toastRef.current?.show({ severity, summary, detail: message, life });
    },
    showCustomToast: (options) => {
      toastRef.current?.show(options);
    }
  }));

  return <Toast ref={toastRef} />;
});

CustToast.displayName = "CustToast";
export default CustToast;
