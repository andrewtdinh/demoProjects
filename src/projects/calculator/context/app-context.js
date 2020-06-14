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
  
  const [count, setCount] = useState(0)

  return (
    <CalculatorContext.Provider value={[count, setCount]}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
