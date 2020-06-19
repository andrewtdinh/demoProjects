import React, { createContext } from "react";

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
};


const reducer = (state, action) => {
  const {
    resultsStartIndex: currentResultsStartIdx,
    memoryStartIndex: currentMemoryStartIdx,
  } = state;

  switch (action.type) {
    case 'RESULTS_SHIFT_LEFT':
      return currentResultsStartIdx === 0
        ? state
        : { ...calcState, resultsStartIndex: currentResultsStartIdx - 1 };
  }
}

const [state, dispatch] = useReducer(reducer, initialState)
// Create Calculator Context
export const CalculatorContext = createContext(initialState);

// Create a provider for components to consume and subscribe to changes
export const CalculatorContextProvider = props => {
  return (
    <CalculatorContext.Provider value={initialState}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
