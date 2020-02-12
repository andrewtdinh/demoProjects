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

  const Display = ({
    bgColor=displayBGColor,
    textColor=displayColor,
    strValue="0",
  }) => {
    return (
      <div
        className={Styles.displayWrapper}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <div className={Styles.displayWindow}>{strValue}</div>
      </div>
    )
  }

  return (
    <div className={Styles.container} >
      <div className={Styles.calcTitle}>Little Bean Counter</div>
      <div className={Styles.calcWrapper}>
        <Display bgColor={displayBGColor} textColor={displayColor} />
        {renderButtons()}
      </div>
    </div>
  )
}



const renderButtons = () => {
  return buttons.map(buttonProps => {
    const { onClick, label, color, bgColor, rowSpan, name, type } = buttonProps;
    const span = rowSpan ? `span ${rowSpan}` : 'span 1';

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

const Button = (props) => {
  const { onClick, label, color, bgColor, span, name, type } = props;
  const fontSize = type === 'blue-button' ? 
    '3rem' : 
    type === 'orange-operator-button' ? '1.3rem' : '0.9rem'

  return (
    <button 
      onClick={onClick ? onClick : () => {}}
      style={{
        gridColumn: span,
        color: color,
        backgroundColor: bgColor,
        fontWeight: 600,
        fontSize: fontSize,
        borderRadius: '7px'
      }}
      key={name}
      aria-label={name}
    >
      {label}
    </button>
  )
}

export default Calculator;