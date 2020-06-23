import React, { useContext, useReducer } from 'react';
import Styles from './index.module.css';
import Button from './components/button';
import Display from './components/display';
import DisplayFeatures from './components/display-features';
import MemoryBar from './components/memory';
import ResultsBar from './components/results';
import { buttons, displayColor, displayBGColor } from './buttons';
import { maxResultsEntries, maxMemoryEntries, displayedMemoryEntries, displayedResultsEntries } from "./constants";

import { CalculatorContext, CalculatorContextProvider, reducer } from './context/app-context';

const Calculator = () => {
  const initialState = useContext(CalculatorContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { 
    resultsStartIndex: currentResultsStartIdx,
    memoryStartIndex: currentMemoryStartIdx
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
    e.preventDefault()
    console.log({currentResultsStartIdx})
    dispatch({ type: "RESULTS_SHIFT_LEFT" })
  }

  const onResultsShiftRightClick = (e) => {
    const { prevResults } = state;
    const qtyPreviousResults = prevResults.length;
    console.log({prevResults})

    e.preventDefault()
    return qtyPreviousResults < maxResultsEntries
      ? currentResultsStartIdx < qtyPreviousResults - displayedResultsEntries
        ? dispatch({ ...state, resultsStartIndex: currentResultsStartIdx + 1})
        : null
      : currentResultsStartIdx < maxResultsEntries - displayedResultsEntries
        ? dispatch({ ...state, resultsStartIndex: currentResultsStartIdx + 1})
        : null
  }

  const onMemoryShiftLeftClick = (e) => {
    e.preventDefault()
    return currentMemoryStartIdx === 0
      ? null
      : dispatch({ ...state, memoryStartIndex: currentMemoryStartIdx - 1 });
  }

  const onMemoryShiftRightClick = (e) => {
    const { memories } = state;
    const qtyMemoryEntries = memories.length;

    e.preventDefault()
    return qtyMemoryEntries < maxMemoryEntries
      ? currentMemoryStartIdx < qtyMemoryEntries - displayedMemoryEntries
        ? dispatch({ ...state, memoryStartIndex: currentMemoryStartIdx + 1 })
        : null
      : currentMemoryStartIdx < maxMemoryEntries - displayedMemoryEntries
        ? dispatch({ ...state, memoryStartIndex: currentMemoryStartIdx + 1 })
        : null
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

  const updatedState = { ...state, onResultsShiftLeftClick, onResultsShiftRightClick};

  return (
    <CalculatorContextProvider >
      <div className={Styles.container}>
        <MemoryBar />
        <Display
          bgColor={displayBGColor}
          textColor={displayColor}
          displayStr={state.displayStr}
        />
        {renderDisplayFeatures()}
        <ResultsBar {...updatedState} />
        <div className={Styles.buttonWrapper}>
          {renderButtons()}
        </div>
        <div className={Styles.calcTitle}>Little Bean Counter</div>
      </div>
    </CalculatorContextProvider>
  )
}

export default Calculator;