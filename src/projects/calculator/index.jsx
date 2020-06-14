import React, { useContext } from 'react';
import Styles from './index.module.css';
import Button from './components/button';
import Display from './components/display';
import DisplayFeatures from './components/display-features';
import MemoryBar from './components/memory';
import ResultsBar from './components/results';
import { maxResultsEntries, maxMemoryEntries, displayedMemoryEntries, displayedResultsEntries } from './constants';
import {  
  buttons, 
  displayColor, 
  displayBGColor,
} from './buttons';

import { CalculatorContext } from './context/app-context';

// export const AppContext = createContext();

const Calculator = () => {
  // const initialState = {
  //   displayStr: '0',
  //   operand1: null,
  //   operand2: null,
  //   lastResult: null,
  //   prevResults: [],
  //   memories: [],
  //   operation: null,
  //   resultsStartIndex: 0,
  //   memoryStartIndex: 0,
  //   onResultsShiftLeftClick,
  //   onResultsShiftRightClick,
  //   onMemoryShiftLeftClick,
  //   onMemoryShiftRightClick
  // }
  
  const [ calcState, setCalcState ] = useContext(CalculatorContext);
  
  
  const { 
    resultsStartIndex: currentResultsStartIdx,
    memoryStartIndex: currentMemoryStartIdx
  } = calcState;

  const updateDisplay = (newDisplayStr) => {
    setCalcState({ ...calcState, displayStr: newDisplayStr })
  }

  // TODO: have the displayResults array in state and change it when people shift results left or right
  const onResultsShiftLeftClick = (e) => {
    e.preventDefault()
    return currentResultsStartIdx === 0
      ? null
      : setCalcState({ ...calcState, resultsStartIndex: currentResultsStartIdx - 1});
  }

  const onResultsShiftRightClick = (e) => {
    const { prevResults } = calcState;
    const qtyPreviousResults = prevResults.length;
    console.log({prevResults})

    e.preventDefault()
    return qtyPreviousResults < maxResultsEntries
      ? currentResultsStartIdx < qtyPreviousResults - displayedResultsEntries
        ? setCalcState({ ...calcState, resultsStartIndex: currentResultsStartIdx + 1})
        : null
      : currentResultsStartIdx < maxResultsEntries - displayedResultsEntries
        ? setCalcState({ ...calcState, resultsStartIndex: currentResultsStartIdx + 1})
        : null
  }

  const onMemoryShiftLeftClick = (e) => {
    e.preventDefault()
    return currentMemoryStartIdx === 0
      ? null
      : setCalcState({ ...calcState, memoryStartIndex: currentMemoryStartIdx - 1 });
  }

  const onMemoryShiftRightClick = (e) => {
    const { memories } = calcState;
    const qtyMemoryEntries = memories.length;

    e.preventDefault()
    return qtyMemoryEntries < maxMemoryEntries
      ? currentMemoryStartIdx < qtyMemoryEntries - displayedMemoryEntries
        ? setCalcState({ ...calcState, memoryStartIndex: currentMemoryStartIdx + 1 })
        : null
      : currentMemoryStartIdx < maxMemoryEntries - displayedMemoryEntries
        ? setCalcState({ ...calcState, memoryStartIndex: currentMemoryStartIdx + 1 })
        : null
  }

  /**
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

  const renderDisplayFeatures = () => {
    return (
      <DisplayFeatures>
        <button>export</button>
      </DisplayFeatures>
    )
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

  return (
    <AppContext.Provider value={initialState} >
      <div className={Styles.container}>
        <MemoryBar />
        <Display
          bgColor={displayBGColor}
          textColor={displayColor}
          displayStr={calcState.displayStr}
        />
        {renderDisplayFeatures()}
        <ResultsBar />
        <div className={Styles.buttonWrapper}>
          {renderButtons()}
        </div>
        <div className={Styles.calcTitle}>Little Bean Counter</div>
      </div>
    </AppContext.Provider>
  )
}

export default Calculator;