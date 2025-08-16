"use client";
import React from "react";

const severityStyles = {
  info:      { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-800",   icon: "text-blue-600" },
  success:   { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-800",  icon: "text-green-600" },
  warn:      { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-900", icon: "text-yellow-600" },
  error:     { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-800",    icon: "text-red-600" },
  secondary: { bg: "bg-gray-100",  border: "border-gray-200",   text: "text-gray-800",   icon: "text-gray-500" },
  contrast:  { bg: "bg-black",     border: "border-black",      text: "text-white",      icon: "text-white" }
};

const MessageBanner = ({
  severity = "info",
  icon = "",
  imageUrl,
  alt,
  children,
  actions,
  className = "",
  style,
  bannerId,
  textClassName = "",
  hasBorder = false,
  hasShadow = false
}) => {
  const { bg, border, text, icon: iconText } = severityStyles[severity] || severityStyles.info;

  return (
    <div
      id={bannerId}
      className={`flex items-center px-4 py-5 rounded-lg ${bg} ${hasBorder ? border : ""} ${hasShadow ? "shadow-sm" : ""} ${text} ${className}`}
      style={style}
      role="status"
      aria-live="polite"
    >
      {imageUrl ? (
        <img src={imageUrl} alt={alt || ""} className="h-6 w-6 mr-3 object-contain" style={{ minWidth: "1.5rem" }} />
      ) : icon ? (
        <i className={`pi ${icon} h-6 w-6 mr-3 ${iconText}`} style={{ fontSize: "1.5rem" }} />
      ) : null}
      <span className={`flex-1 text-sm font-medium ${textClassName}`}>{children}</span>
      {actions && <div className="ml-3">{actions}</div>}
    </div>
  );
};

export default MessageBanner;
