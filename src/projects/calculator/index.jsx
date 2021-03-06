import React, { useContext, useReducer, useEffect } from 'react';
import Styles from './index.module.css';
import Button from './components/button';
import Display from './components/display';
import DisplayFeatures from './components/display-features';
import MemoryBar from './components/memory';
import ResultsBar from './components/results';
import { buttons, displayColor, displayBGColor } from './buttons';
import copy from 'copy-to-clipboard';

import { CalculatorContext, CalculatorContextProvider, reducer, executeOperation, ERRORS } from './context/app-context';

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

  const copyDisplayToClipboard = () => {
    copy(state.displayStr)
  }

  const copyResultsToClipboard = () => {
    const resultString = state.prevResults.join(', ')
    copy(resultString);
  }

  const copyMemoriesToClipboard = () => {
    const memoryString = state.memories.join(', ')
    copy(memoryString);
  }

  const onClearResultsClick = () => {
    dispatch({ type: 'CLEAR_RESULTS' });
  }

  const onClearMemoriesClick = () => {
    dispatch({ type: 'CLEAR_MEMORIES' });
  }

  const { 
    shouldDisplayResetOnNext,
  } = state;

  const updateDisplay = (newDisplayStr) => {
    dispatch({
      type: 'UPDATE_DISPLAY',
      payload: newDisplayStr,
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
    if (buttonValue === '0' && previousDisplayStr === '0') {
      dispatch({ type: "UNRESET_DISPLAY_ON_NEXT_CLICK" })
      return;
    }
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
      type: "ON_BINARY_OPERATOR_PRESSED",
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
    const isDisplayStrNegative = previousDisplayStr ? `${previousDisplayStr}`.includes('-') : false;

    e.preventDefault();
    updateDisplay(isDisplayStrNegative ? previousDisplayStr.slice(1) : '-' + previousDisplayStr);
  }

  const renderDisplayFeatures = () => {
    return (
      <DisplayFeatures>
        <button onClick={copyDisplayToClipboard}>copy display</button>
        <button onClick={copyResultsToClipboard}>copy results</button>
        <button onClick={copyMemoriesToClipboard}>copy memories</button>
        <button onClick={onClearMemoriesClick}>clr mem</button>
        <button onClick={onClearResultsClick}>clr res</button>
      </DisplayFeatures>
    )
  }

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
    const result = executeOperation('sqrt', (state.displayStr * 1))

    e.preventDefault();
    dispatch({
      type: 'ON_SQUARE_ROOT_OPERATOR_TAP',
      payload: { result }
    })
    dispatch({
      type: 'RESULTS_IN',
      payload: result
    })
  }

  const onScrollBarEntryClick = (e) => {
    e.preventDefault();
    updateDisplay(`${e.currentTarget.innerText}`)
    resetDisplayOnNextKeyTap()
  }

  const onPercentOfOperatorClick = (e) => {
    const { operand1, pendingOp } = state;
    e.preventDefault();
    if (!operand1) {
      dispatch({
        type: "SET_OPERAND",
        payload: {
          operandOrder: 1,
          value: state.displayStr * 1 / 100, 
          pendingOp: 'x',
          nextDisplayValue: '0'
        }
      })
    } else {
      const result = executeOperation(pendingOp ?? "x", operand1 * 1, state.displayStr * 1)
      dispatch({
        type: "ON_BINARY_OPERATOR_PRESSED",
        payload: {
          operandNum: 1,
          operandValue: `${result / 100}`,
          nextDisplayValue: `${result}`,
          shouldDisplayResetOnNext: true,
          pendingOp: "x",
        },
      })
    }
  }

  const onMultOperatorClick = (e) => {
    const { displayStr, pendingOp, operand1 } = state;

    e.preventDefault();
    if (!operand1) {
      dispatch({
        type: "ON_BINARY_OPERATOR_PRESSED",
        payload: {
          operandNum: 1,
          operandValue: displayStr,
          nextDisplayValue: "0",
          pendingOp: 'x'
        },
      })
    } else {
      const result = executeOperation(pendingOp || 'x', (operand1 * 1), (displayStr * 1))
      const isError = Boolean(ERRORS[result])
      if (isError) {
        dispatch({
          type: "ON_ERROR_THROWN",
          payload: {
            errorMsg: ERRORS[result]
          }
        })
      } else {
        dispatch({
          type: "ON_BINARY_OPERATOR_PRESSED",
          payload: {
            operandNum: 1,
            operandValue: `${result}`,
            nextDisplayValue: `${result}`,
            shouldDisplayResetOnNext: true,
            pendingOp: 'x'
          },
        })
      }
    }
  }

  const onDivisionOperatorClick = (e) => {
    const { displayStr, pendingOp, operand1 } = state

    e.preventDefault()
    if (!operand1) {
      dispatch({
        type: "ON_BINARY_OPERATOR_PRESSED",
        payload: {
          operandNum: 1,
          operandValue: displayStr,
          nextDisplayValue: "0",
          pendingOp: ":",
        },
      })
    } else {
      const result = executeOperation(
        pendingOp || ":",
        operand1 * 1,
        displayStr * 1
      )
      const isError = Boolean(ERRORS[result])
      if (isError) {
        dispatch({
          type: "ON_ERROR_THROWN",
          payload: {
            errorMsg: ERRORS[result],
          },
        })
      } else {
        dispatch({
          type: "ON_BINARY_OPERATOR_PRESSED",
          payload: {
            operandNum: 1,
            operandValue: `${result}`,
            nextDisplayValue: `${result}`,
            shouldDisplayResetOnNext: true,
            pendingOp: ":",
          },
        })
      }
    }
  }

  const onAdditionOperatorClick = e => {
    const { displayStr, pendingOp, operand1 } = state;

    e.preventDefault()
    if (!operand1) {
      dispatch({
        type: "ON_BINARY_OPERATOR_PRESSED",
        payload: {
          operandNum: 1,
          operandValue: displayStr,
          nextDisplayValue: "0",
          pendingOp: '+'
        },
      })
    } else {
      const result = executeOperation(
        pendingOp || '+',
        operand1 * 1,
        displayStr * 1
      )
      dispatch({
        type: "ON_BINARY_OPERATOR_PRESSED",
        payload: {
          operandNum: 1,
          operandValue: `${result}`,
          nextDisplayValue: `${result}`,
          shouldDisplayResetOnNext: true,
          pendingOp: '+'
        },
      })
    }
  }

  const onSubtractionOperatorClick = e => {
     const { displayStr, pendingOp, operand1 } = state

     e.preventDefault()
     if (!operand1) {
       dispatch({
         type: "ON_BINARY_OPERATOR_PRESSED",
         payload: {
           operandNum: 1,
           operandValue: displayStr,
           nextDisplayValue: "0",
           pendingOp: "-",
         },
       })
     } else {
       const result = executeOperation(
         pendingOp || "-",
         operand1 * 1,
         displayStr * 1
       )
       dispatch({
         type: "ON_BINARY_OPERATOR_PRESSED",
         payload: {
           operandNum: 1,
           operandValue: `${result}`,
           nextDisplayValue: `${result}`,
           shouldDisplayResetOnNext: true,
           pendingOp: "-",
         },
       })
     }
  }

  const onEqualOperatorClick = e => {
    e.preventDefault()
    const { displayStr, pendingOp, operand1 } = state

    if (!operand1) {
      dispatch({
        type: "ON_EQUAL_BUTTON_PRESSED",
        payload: {
          result: displayStr,
        },
      })
    } else if (pendingOp) {
      const result = executeOperation(
        pendingOp,
        operand1 * 1,
        displayStr * 1
      )
      dispatch({
        type: "ON_EQUAL_BUTTON_PRESSED",
        payload: {
          result
        },
      })
    }
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