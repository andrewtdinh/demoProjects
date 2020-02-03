import React from 'react';
import Styles from './index.module.css';

const Calculator = () => {
  return (
    <div className={Styles.container} >
      <div className={Styles.calcTitle} >imMaculator</div>
      <div className={Styles.calcWrapper}></div>
    </div>
  )
}

const Display = () => {
  return (
    <div className="displayContainer">

    </div>
  )
}

const Button = (props) => {
  const { onClick, value } = props;

  return (
    <button onClick={onClick} >{value}</button>
  )
}

export default Calculator;