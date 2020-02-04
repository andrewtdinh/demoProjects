import React from 'react';
import Styles from './index.module.css';

const displayBGColor = '#918987';
const displayColor = '#ffffff';

const Calculator = () => {
  return (
    <div className={Styles.container} >
      <div className={Styles.calcTitle}>imMaculator</div>
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
        // display: "flex",
        // justifyContent: "flex-end",
        // alignItems: "center",
        // gridColumn: "span 4",
        // borderRadius: "3px",
        // textAlign: "right"
      }}
    >
      <div className={Styles.displayWindow}>{strValue}</div>
    </div>
  )
}

const Buttons = () => {

}

const Button = (props) => {
  const { onClick, value } = props;

  return (
    <button onClick={onClick} >{value}</button>
  )
}

export default Calculator;