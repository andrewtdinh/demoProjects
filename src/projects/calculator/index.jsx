import React from 'react';

const Calculator = () => {
  return (
    <div className="container" style={{
      "backgroundColor": "blue",
      "width": "80%",
      "height": "100vh",
    }}>
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