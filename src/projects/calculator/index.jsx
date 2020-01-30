import React from 'react';
import Styles from './index.module.css';

const Calculator = () => {
  return (
    // <div className="container" style={{
    //   "backgroundColor": "blue",
    //   "width": "80%",
    //   "height": "100vh",
    //   "margin": "0 auto"
    // }}>
    // </div>
    <div className="container" style={Styles.container}>
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