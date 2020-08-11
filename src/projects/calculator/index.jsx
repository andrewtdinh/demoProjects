import React, { useContext, useReducer, useEffect } from 'react';
import Styles from './index.module.css';
import Button from './components/button';
import Display from './components/display';
import DisplayFeatures from './components/display-features';
import MemoryBar from './components/memory';
import ResultsBar from './components/results';
import { buttons, displayColor, displayBGColor } from './buttons';

import { CalculatorContext, CalculatorContextProvider, reducer, executeOperation } from './context/app-context';

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
        onResultsShiftRightClick,
        onScrollBarEntryClick
      }
    })
  }, []);

  const { 
    resultsStartIndex: currentResultsStartIdx,
    memoryStartIndex: currentMemoryStartIdx,
    operand1,
    operand2,
    shouldDisplayResetOnNext,
  } = state;

  const updateDisplay = (newDisplayStr) => {
    dispatch({
      type: 'UPDATE_DISPLAY',
      payload: newDisplayStr,
    });
  }

  const clearOperand = (operandOrder) => {
    dispatch({
      type: 'CLEAR_OPERAND',
      payload: operandOrder
    });
  }

  const setOperandValue = (operandOrder, nextValue) => {
    dispatch({
      type: 'SET_OPERAND',
      payload: {
        operandOrder,
        value: nextValue
      }
    });
  }

  const resetDisplayOnNextKeyTap = () => {
    dispatch({
      type: 'RESET_DISPLAY_ON_NEXT_KEY_TAP'
    })
  }

  const onNumbersClick = (e) => {
    const buttonValue = e.target.value;
    const { displayStr: previousDisplayStr } = state;
    
    e.preventDefault();
    if (buttonValue === '0' && previousDisplayStr === '0') {return;}
    if (previousDisplayStr === '0' && '123456789'.includes(buttonValue)) {
      updateDisplay(buttonValue);
      dispatch({ type: "UNRESET_DISPLAY_ON_NEXT_CLICK" });
    } else {
      if (shouldDisplayResetOnNext) {
        resetDisplay();
        updateDisplay(buttonValue);
        dispatch({ type: "UNRESET_DISPLAY_ON_NEXT_CLICK" });
      } else {
        updateDisplay(previousDisplayStr + buttonValue);
      }
    }
  }
  
  const resetDisplay = () => {
    updateDisplay("0");
  }

  const onClearBtnClick = (e) => {
    e.preventDefault();
    resetDisplay();
    dispatch({
      type: "UPDATE_OPERAND_AND_DISPLAY_VALUE",
      payload: {
        operandNum: 1,
        operandValue: '',
        nextDisplayValue: '0',
        shouldDisplayResetOnNext: false,
      }
    })
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
        <button>export display</button>
        <button>export results</button>
        <button>export memories</button>
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

  const onSquareRootButtonClick = (e) => {
    e.preventDefault();
  }

  const onScrollBarEntryClick = (e) => {
    e.preventDefault();
    updateDisplay(`${e.currentTarget.innerText}`)
  }

  const onPercentOfOperatorClick = (e) => {
    e.preventDefault();
  }

  const onMultOperatorClick = (e) => {
    const { displayStr } = state;
    e.preventDefault();
    if (!operand1) {
      dispatch({
        type: "UPDATE_OPERAND_AND_DISPLAY_VALUE",
        payload: {
          operandNum: 1,
          operandValue: displayStr,
          nextDisplayValue: '0'
        }
      })
    } else {
      const newOperandValue = executeOperation('x', (operand1 * 1), (displayStr * 1))
      dispatch({
        type: "UPDATE_OPERAND_AND_DISPLAY_VALUE",
        payload: {
          operandNum: 1,
          operandValue: `${newOperandValue}`,
          nextDisplayValue: `${newOperandValue}`,
          shouldDisplayResetOnNext: true
        },
      })
    }
  }

  const onDivisionOperatorClick = (e) => {
    e.preventDefault();
  }

  const onAdditionOperatorClick = e => {
    e.preventDefault()
  }

  const onSubtractionOperatorClick = e => {
    e.preventDefault()
  }

  const onEqualOperatorClick = e => {
    e.preventDefault()
  }

  const onPeriodButtonClick = e => {
    e.preventDefault()
    const { displayStr: previousDisplayStr, shouldDisplayResetOnNext } = state;

    if (shouldDisplayResetOnNext) {
      dispatch({
        type: "ADD_DECIMAL_POINT",
        payload: {
          nextDisplayValue: "0.",
          shouldDisplayResetOnNext: false
        }
      })
    } else {
      if (previousDisplayStr.includes('.')) {return;}
      else {
        dispatch({
          type: "ADD_DECIMAL_POINT",
          payload: {
            nextDisplayValue: previousDisplayStr + ".",
            shouldDisplayResetOnNext: false,
          },
        })
      }
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
          ? name === "Period Button"
          ? onPeriodButtonClick
          : onNumbersClick
          : type === "clear-button"
          ? onClearBtnClick
          : type === "delete-button"
          ? onDeleteBtnClick
          : label === "±"
          ? onSignBtnClick
          : label === "MEM+"
          ? onMemoryAdded
          : name === "Square Root Operator"
          ? onSquareRootButtonClick
          : name === "Percent Of Operator"
          ? onPercentOfOperatorClick
          : name === "Multiplication Operator"
          ? onMultOperatorClick
          : name === "Division Operator"
          ? onDivisionOperatorClick
          : name === "Addition Operator"
          ? onAdditionOperatorClick
          : name === "Subtraction Operator"
          ? onSubtractionOperatorClick
          : name === "Equal Operator"
          ? onEqualOperatorClick
          : null
      const buttonLabel = name === "Square Root Operator" ? "SQRT" : label;

      return (
        <Button
          onClick={onClickFn}
          rowSpan={rowSpanString}
          columnSpan={columnSpanString}
          name={name}
          label={buttonLabel}
          color={color}
          bgColor={bgColor}
          type={type}
          value={value}
          key={name}
          isEnabled={true}
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