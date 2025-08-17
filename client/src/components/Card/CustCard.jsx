"use client";
import React from "react";
import { Card } from "primereact/card";

const CustCard = ({ header, footer, title, subTitle, style, className, children, ...rest }) => {
  return (
    <Card
      header={header}
      footer={footer}
      title={title}
      subTitle={subTitle}
      style={style}
      className={`rounded-md shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] ${className}`}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default CustCard;
