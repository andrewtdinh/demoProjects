import React from 'react';
import Styles from './index.module.css';
import buttons from './buttons';

const displayBGColor = '#918987';
const displayColor = '#ffffff';

const Calculator = () => {
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

const renderButtons = () => {
  return buttons.map(buttonProps => {
    const { onClick, label, color, bgColor, rowSpan, name } = buttonProps;
    const span = rowSpan ? `span ${rowSpan}` : 'span 1';
    return (
      <Button 
        onClick={onClick}
        span={span}
        name={name}
        label={label}
      />
    )
  })
}

const Button = (props) => {
  const { onClick, label, color, bgColor, span, name } = props;

  return (
    <button 
      onClick={onClick ? onClick : () => {}}
      style={{
        gridColumn: `span ${span}`,
        color: color,
        backgroundColor: bgColor,
        
      }}
      key={name}
      aria-label={name}
    >
      {label}
    </button>
  )
}

export default Calculator;