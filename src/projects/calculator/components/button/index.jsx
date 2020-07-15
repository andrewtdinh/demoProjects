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
  const backgroundColor = isEnabled ? bgColor : "#e8c5c56b";
  const fontColor = isEnabled ? color : "#c3bcb1eb"

  return (
    <button
      onClick={onClick ? onClick : () => {}}
      style={{
        gridColumn: columnSpan,
        gridRow: rowSpan,
        color: fontColor,
        backgroundColor,
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