import React from "react";

const Button = props => {
  const { onClick, label, color, bgColor, columnSpan, rowSpan, name, type, value } = props;
  const fontSize =
    type === "blue-button" 
      ? "3rem" 
      : type === "orange-operator-button" 
      ? "1.3rem" 
      : "0.9rem";

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
    >
      {label}
    </button>
  )
}

export default Button;