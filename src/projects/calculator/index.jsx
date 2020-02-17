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

  const updateDisplay = (newDisplayStr) => {
    setCalcState({ ...calcState, displayStr: newDisplayStr})
  }

  /**
   * 
   * onNumbersClick is activated when user click on numbers or dot (.) buttons
   */
  const onNumbersClick = (e) => {
    const buttonValue = e.target.value;
    const { displayStr: previousDisplayStr } = calcState;
    
    e.preventDefault();
    if (buttonValue === '.' && previousDisplayStr.includes('.')) {return;}
    if (buttonValue === '0' && previousDisplayStr === '0') {return;}
    if (previousDisplayStr === '0' && '123456789'.includes(buttonValue)) {
      updateDisplay(buttonValue);
    } else {
      updateDisplay(previousDisplayStr + buttonValue);
    }
  }
  
  const onClearBtnClick = (e) => {
    e.preventDefault();
    updateDisplay('0')
  }
  
  const onDeleteBtnClick = (e) => {
    const { displayStr: previousDisplayStr } = calcState;
    const previousDisplayStrLen = previousDisplayStr.length;

    e.preventDefault();
    (previousDisplayStr && previousDisplayStrLen === 1 && updateDisplay('0')) || 
    (previousDisplayStr && previousDisplayStrLen > 1 && updateDisplay(previousDisplayStr.slice(0, previousDisplayStrLen - 1)))
  }

  const onSignBtnClick = (e) => {
    const { displayStr: previousDisplayStr } = calcState;
    const isDisplayStrNegative = previousDisplayStr.includes('-');

    e.preventDefault();
    updateDisplay(isDisplayStrNegative ? previousDisplayStr.slice(1) : '-' + previousDisplayStr);
  }

  const Button = props => {
    const { onClick, label, color, bgColor, span, name, type, value } = props
    const fontSize =
      type === "blue-button" ? 
        "3rem" : 
        type === "orange-operator-button" ? "1.3rem" : "0.9rem"

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
        value={value ? value : null}
      >
        {label}
      </button>
    )
  }

  // TODO: Before converting the display string to a number, consider strings that end in periods,
  // like '235.', which should be convert to 235.0

  const renderButtons = () => {
    return buttons.map(buttonProps => {
      const {
        label,
        color,
        bgColor,
        rowSpan,
        name,
        type,
        value,
      } = buttonProps
      const span = rowSpan ? `span ${rowSpan}` : "span 1";
      const onClickFn =
        type === "blue-button"
          ? onNumbersClick
          : type === "clear-button"
          ? onClearBtnClick
          : type === "delete-button"
          ? onDeleteBtnClick
          : label === "±" 
          ? onSignBtnClick
          : null;

      return (
        <Button
          onClick={onClickFn}
          span={span}
          name={name}
          label={label}
          color={color}
          bgColor={bgColor}
          type={type}
          value={value}
          key={name}
        />
      )
    })
  }

  return (
    <div className={Styles.container} >
      <div className={Styles.calcTitle}>Little Bean Counter</div>
      <div className={Styles.memoryBar}></div>
      <div className={Styles.resultsBar}></div>
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