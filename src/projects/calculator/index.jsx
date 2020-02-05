import React from 'react';
import Styles from './index.module.css';

const displayBGColor = '#918987';
const displayColor = '#ffffff';

const Calculator = () => {
  return (
    <div className={Styles.container} >
      <div className={Styles.calcTitle}>Little Bean Counter</div>
      <div className={Styles.calcWrapper}>
        <Display bgColor={displayBGColor} textColor={displayColor} />
      </div>
    </div>
  )
}

const Display = ({ bgColor=displayBGColor, textColor=displayColor, strValue='0' }) => {
  return (
    <div
      className={Styles.displayWrapper}
      style={{
        backgroundColor: bgColor,
        color: displayColor,
      }}
    >
      <div className={Styles.displayWindow}>{strValue}</div>
    </div>
  )
}

const Buttons = () => {

}

const Button = (props) => {
  const { onClick, label, color, bgColor, span } = props;

  return (
    <button 
      onClick={onClick}
      style={{
        gridColumn: `span ${span}`,
        color: color,
        backgroundColor: bgColor
      }}
    >
      {label}
    </button>
  )
}

export default Calculator;