import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CustReportCard = ({
  icon,
  title,
  redirectUrl,
  customClassName,
}) => {
const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(redirectUrl);
  };

  const [isHoveredCardIcon, setIsHoveredCardIcon] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHoveredCardIcon(true)}
      onMouseLeave={() => setIsHoveredCardIcon(false)}
      onClick={handleRedirect}
      className={`border-[1px] border-solid border-gray-200 w-full rounded-sm hover:border-blue-500 shadow-lg p-8 bg-white flex flex-col items-center group delay-75 ${customClassName}`}
    >
      <div className=" text-4xl bg-[#ede8e8] !h-20 !w-20 rounded-full flex items-center justify-center group-hover:text-blue-500 mb-5">
        {isHoveredCardIcon ? icon[0] : icon[1]}
      </div>
      <button className="bg-[#6c757d] border-0 text-white px-6 py-2 w-full rounded-sm group-hover:bg-blue-600 transition duration-300">
        {title}
      </button>
    </div>
  );
};

export default CustReportCard;
