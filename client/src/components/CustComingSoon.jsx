"use client";
import React from "react";
// import comingSoon from "";

const CustComingSoon = ({ title = "Coming Soon", className = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex justify-center mb-6">
        {/* <img src={comingSoon} alt="Coming Soon" className="max-w-full h-auto" style={{ maxHeight: '400px' }} /> */}
      </div>
      <h2 className="text-3xl font-bold text-gray-800 text-center">{title}</h2>
    </div>
  );
};

export default CustComingSoon;
