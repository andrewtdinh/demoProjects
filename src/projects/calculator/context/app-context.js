import React, { createContext, useReducer } from "react";

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
    prevResults
  } = state;
  const qtyPreviousResults = prevResults.length

  switch (action.type) {
    case 'RESULTS_SHIFT_LEFT':
      return currentResultsStartIdx === 0
        ? state
        : { ...state, resultsStartIndex: currentResultsStartIdx - 1 };

    case 'RESULTS_SHIFT_RIGHT':
      return qtyPreviousResults < maxResultsEntries
        ? currentResultsStartIdx < qtyPreviousResults - displayedResultsEntries
          ? setCalcState({
              ...calcState,
              resultsStartIndex: currentResultsStartIdx + 1,
            })
          : null
        : currentResultsStartIdx < maxResultsEntries - displayedResultsEntries
        ? setCalcState({
            ...calcState,
            resultsStartIndex: currentResultsStartIdx + 1,
          })
        : null
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
