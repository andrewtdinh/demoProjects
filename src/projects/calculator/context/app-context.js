import React, { useState, createContext } from "react"

// Create Calculator Object
export const CalculatorContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CalculatorContextProvider = props => {
  const initialState = {
    displayStr: "0",
    operand1: null,
    operand2: null,
    lastResult: null,
    prevResults: [],
    memories: [],
    operation: null,
    resultsStartIndex: 0,
    memoryStartIndex: 0,
    onResultsShiftLeftClick,
    onResultsShiftRightClick,
    onMemoryShiftLeftClick,
    onMemoryShiftRightClick,
  }

  const [ calcState, setCalcState ] = useState(initialState);

  return (
    <CalculatorContext.Provider value={[ calcState, setCalcState ]}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
