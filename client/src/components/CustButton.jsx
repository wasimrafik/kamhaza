import React from "react";
import { Button as PrimeButton } from "primereact/button";
import { Badge } from 'primereact/badge';

// severity	"success" | "help" | "warning" | "secondary" | "info" | "danger" | "contrast"

const CustButton = ({
    iconPos = "right",
    loading = false,
    disabled = false,
    badgeValue,
    badgeSeverity,
    styleType = "primary",
    onClick,
    tooltip,
    tooltipOptions,
    label,
    icon,
    badge,
    severity,
    badgeClassName,
    className = "",
    children,
    ...rest
}) => {
    return (
        <PrimeButton label={label}
            icon={icon}
            iconPos={iconPos}
            className={`p-button-${styleType} border-round-sm text-sm ${className}`}
            loading={loading}
            disabled={disabled}
            onClick={onClick}
            style={{ outline: 0 }}
            tooltip={tooltip}
            tooltipOptions={tooltipOptions}
            {...rest} >
            {badgeValue && <Badge value={badgeValue} severity={badgeSeverity} />}
        </PrimeButton>
    );
};

export default CustButton;
