import React, { useState } from 'react';
import Styles from './index.module.css';
import { 
  buttons, 
  displayColor, 
  displayBGColor, 
} from './buttons';

const Calculator = () => {
  const initialState = {
    displayStr: '0',
    operand1: null,
    operand2: null,
    prevResult: null,
    operation: null
  }

  const [ calcState, setCalcState ] = useState(initialState);

  const Display = ({
    bgColor=displayBGColor,
    textColor=displayColor,
    displayStr="0",
  }) => {
    return (
      <div
        className={Styles.displayWrapper}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <div className={Styles.displayWindow}>{displayStr}</div>
      </div>
    )
  }

  const Button = props => {
    const { onClick, label, color, bgColor, span, name, type } = props
    const fontSize =
      type === "blue-button"
        ? "3rem"
        : type === "orange-operator-button"
        ? "1.3rem"
        : "0.9rem"

    return (
      <button
        onClick={onClick ? onClick : () => {}}
        style={{
          gridColumn: span,
          color: color,
          backgroundColor: bgColor,
          fontWeight: 600,
          fontSize: fontSize,
          borderRadius: "7px",
        }}
        key={name}
        aria-label={name}
      >
        {label}
      </button>
    )
  }

  const renderButtons = () => {
    return buttons.map(buttonProps => {
      const {
        onClick,
        label,
        color,
        bgColor,
        rowSpan,
        name,
        type,
      } = buttonProps
      const span = rowSpan ? `span ${rowSpan}` : "span 1"

      return (
        <Button
          onClick={onClick}
          span={span}
          name={name}
          label={label}
          color={color}
          bgColor={bgColor}
          type={type}
        />
      )
    })
  }

  return (
    <div className={Styles.container} >
      <div className={Styles.calcTitle}>Little Bean Counter</div>
      <div className={Styles.calcWrapper}>
        <Display 
          bgColor={displayBGColor} 
          textColor={displayColor}
          displayStr={calcState.displayStr}
        />
        {renderButtons()}
      </div>
    </div>
  )
}

export default Calculator;