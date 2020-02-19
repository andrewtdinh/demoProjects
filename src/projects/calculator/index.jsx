import React, { useState } from 'react';
import Styles from './index.module.css';
import Button from './components/button';
import Display from './components/display';
import { 
  buttons, 
  displayColor, 
  displayBGColor,
  memoryBarBGColor,
  memoryTextColor,
  resultsBarBGColor,
  resultsTextColor
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

  const MemoryBar = ({
    bgColor=memoryBarBGColor,
    textColor=memoryTextColor,
    memories=[]
  }) => {
    return (
      <div
        className={Styles.memoryBar}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <div>Memory:</div>
        <div className={Styles.memoryCells}>
          {memories.map((memValue, idx) => {
            return <div key={`${idx}:${memValue}`}>{memValue}</div>
          })}
        </div>
      </div>
    )
  }

  const ResultsBar = ({
    bgColor=resultsBarBGColor,
    textColor=resultsTextColor,
    results=[]
  }) => {
    return (
      <div
        className={Styles.resultsBar}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <div></div>
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
      <MemoryBar />
      <ResultsBar />
      <div className={Styles.calcWrapper}>
        <Display 
          bgColor={displayBGColor} 
          textColor={displayColor}
          displayStr={calcState.displayStr}
        />
        {renderButtons()}
      </div>
      <div className={Styles.calcTitle}>Little Bean Counter</div>
    </div>
  )
}

export default Calculator;