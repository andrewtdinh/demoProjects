import React, { useContext, useReducer, useEffect } from 'react';
import Styles from './index.module.css';
import Button from './components/button';
import Display from './components/display';
import DisplayFeatures from './components/display-features';
import MemoryBar from './components/memory';
import ResultsBar from './components/results';
import { buttons, displayColor, displayBGColor } from './buttons';

import { CalculatorContext, CalculatorContextProvider, reducer } from './context/app-context';

const Calculator = () => {
  const initialState = useContext(CalculatorContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_STATE',
      payload: {
        ...state,
        onMemoryShiftLeftClick,
        onMemoryShiftRightClick,
        onResultsShiftLeftClick,
        onResultsShiftRightClick
      }
    })
  }, []);

  const { 
    resultsStartIndex: currentResultsStartIdx,
    memoryStartIndex: currentMemoryStartIdx,
    isPercentMode
  } = state;

  const updateDisplay = (newDisplayStr) => {
    dispatch({
      type: 'UPDATE_DISPLAY',
      payload: newDisplayStr,
    });
  }

  /**
   * onNumbersClick is activated when user click on numbers or dot (.) buttons
   */
  const onNumbersClick = (e) => {
    const buttonValue = e.target.value;
    const { displayStr: previousDisplayStr } = state;
    
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
    const { displayStr: previousDisplayStr } = state;
    const previousDisplayStrLen = previousDisplayStr.length;

    e.preventDefault();
    (previousDisplayStr && previousDisplayStrLen === 1 && updateDisplay('0')) || 
    (previousDisplayStr && previousDisplayStrLen > 1 && updateDisplay(previousDisplayStr.slice(0, previousDisplayStrLen - 1)))
  }

  const onSignBtnClick = (e) => {
    const { displayStr: previousDisplayStr } = state;
    const isDisplayStrNegative = previousDisplayStr.includes('-');

    e.preventDefault();
    updateDisplay(isDisplayStrNegative ? previousDisplayStr.slice(1) : '-' + previousDisplayStr);
  }

  // TODO: Before converting the display string to a number, consider strings that end in periods,
  // like '235.', which should be convert to 235.0

  const renderDisplayFeatures = () => {
    return (
      <DisplayFeatures>
        <button>export</button>
      </DisplayFeatures>
    )
  }

  // TODO: have the displayResults array in state and change it when people shift results left or right
  const onResultsShiftLeftClick = (e) => {
    e.preventDefault();
    dispatch({ type: "SHIFT_RESULTS_LEFT" })
  }

  const onResultsShiftRightClick = (e) => {
    e.preventDefault();
    dispatch({ type: "SHIFT_RESULTS_RIGHT"})
  }

  const onMemoryShiftLeftClick = (e) => {
    e.preventDefault();
    dispatch({ type: "SHIFT_MEMORY_LEFT" });
  }

  const onMemoryShiftRightClick = (e) => {
    e.preventDefault();
    dispatch({ type: "SHIFT_MEMORY_RIGHT" });
  }

  const onMemoryAdded = (e) => {
    e.preventDefault();
    dispatch({ type: "MEMORY_IN", payload: state.displayStr });
  }

  const onConvertNumberClick = (e) => {
    e.preventDefault();
    if (isPercentMode){

    } else {

    }
  }

  const renderButtons = () => {
    return buttons.map(buttonProps => {
      const {
        label,
        color,
        bgColor,
        rowSpan,
        columnSpan,
        name,
        type,
        value,
      } = buttonProps
      const rowSpanString = rowSpan ? `span ${rowSpan}` : "span 1";
      const columnSpanString = columnSpan ? `span ${columnSpan}` : "span 1";
      const onClickFn =
        type === "blue-button"
          ? onNumbersClick
          : type === "clear-button"
          ? onClearBtnClick
          : type === "delete-button"
          ? onDeleteBtnClick
          : label === "±" 
          ? onSignBtnClick
          : label === "MEM+"
          ? onMemoryAdded
          : name === "Percent Of Operator"
          ? onConvertNumberClick
          : null;

      return (
        <Button
          onClick={onClickFn}
          rowSpan={rowSpanString}
          columnSpan={columnSpanString}
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
    <CalculatorContextProvider >
      <div className={Styles.container}>
        <MemoryBar memories={state.memories} { ...state } />
        <Display
          bgColor={displayBGColor}
          textColor={displayColor}
          displayStr={state.displayStr}
        />
        {renderDisplayFeatures()}
        <ResultsBar results={state.prevResults} { ...state } />
        <div className={Styles.buttonWrapper}>
          {renderButtons()}
        </div>
        <div className={Styles.calcTitle}>Little Bean Counter</div>
      </div>
    </CalculatorContextProvider>
  )
}

export default Calculator;