import React from "react";

const Button = props => {
  const { onClick, label, color, bgColor, columnSpan, rowSpan, name, type, value, isEnabled } = props;
  const fontSize =
    type === "blue-button" 
      ? "2.6rem" 
      : type === "orange-operator-button" 
      ? "1.1rem" 
      : "0.9rem";
  const disabled = isEnabled ? '' : 'disabled';

  return (
    <button
      onClick={onClick ? onClick : () => {}}
      style={{
        gridColumn: columnSpan,
        gridRow: rowSpan,
        color: color,
        backgroundColor: bgColor,
        fontWeight: 600,
        fontSize: fontSize,
        borderRadius: "7px",
      }}
      key={name}
      aria-label={name}
      value={value ? value : null}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button;