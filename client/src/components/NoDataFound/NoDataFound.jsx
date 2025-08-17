// NoDataFound.jsx
import React from "react";
// if you keep your image in public/ folder, no need to import it
const defaultImage = "../../../assets/Images/NoDataColorImage.png";

export default function NoDataFound({
  title = "No Data Found",                // default title
  description = "Try adjusting your filters or add a new item.", // default desc
  imageSrc = defaultImage,                // default image
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-10 px-4 text-center ${className}`}
    >
      <img
        src={imageSrc}
        alt="No Data"
        className="w-36 h-36 object-contain mb-4 pointer-events-none select-none"
        draggable={false}
      />

      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1">
        {description}
      </p>
    </div>
  );
}
