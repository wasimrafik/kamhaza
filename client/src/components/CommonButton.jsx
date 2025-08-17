import React from 'react';
import { Button } from 'primereact/button';

const CommonButton = ({ 
  label, 
  icon, 
  severity = 'primary', 
  className = '', 
  loading = false,
  ...props 
}) => {
  return (
    <Button
      label={label}
      icon={icon}
      severity={severity}
      className={`${className}`}
      loading={loading}
      {...props}
    />
  );
};

export default CommonButton; 