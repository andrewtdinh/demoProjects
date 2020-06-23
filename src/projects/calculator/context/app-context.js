import React, { createContext, useReducer } from "react";
import {
  maxResultsEntries,
  maxMemoryEntries,
  displayedMemoryEntries,
  displayedResultsEntries,
} from "../constants";

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
}

// Create Calculator Context
export const CalculatorContext = createContext(initialState);

// Create a provider for components to consume and subscribe to changes
export const reducer = (state, action) => {
  const {
    resultsStartIndex: currentResultsStartIdx,
    memoryStartIndex: currentMemoryStartIdx,
    prevResults,
    memories,
  } = state;
  const qtyPreviousResults = prevResults.length
  const qtyMemoryEntries = memories.length

  switch (action.type) {
    case "UPDATE_DISPLAY":
      return { ...state, displayStr: action.payload}
    case "RESULTS_SHIFT_LEFT":
      return currentResultsStartIdx === 0
        ? state
        : { ...state, resultsStartIndex: currentResultsStartIdx - 1 }

    case "RESULTS_SHIFT_RIGHT":
      return qtyPreviousResults < maxResultsEntries
        ? currentResultsStartIdx <
          qtyPreviousResults - displayedResultsEntries
          ? { ...state, resultsStartIndex: currentResultsStartIdx + 1 }
          : state
        : currentResultsStartIdx < maxResultsEntries - displayedResultsEntries
        ? { ...state, resultsStartIndex: currentResultsStartIdx + 1 }
        : state

    case "MEMORY_SHIFT_LEFT":
      return currentMemoryStartIdx === 0
        ? state
        : { ...state, memoryStartIndex: currentMemoryStartIdx - 1 }

    case "MEMORY_SHIFT_RIGHT":
      return qtyMemoryEntries < maxMemoryEntries
        ? currentMemoryStartIdx < qtyMemoryEntries - displayedMemoryEntries
          ? { ...state, memoryStartIndex: currentMemoryStartIdx + 1 }
          : state
        : currentMemoryStartIdx < maxMemoryEntries - displayedMemoryEntries
        ? { ...state, memoryStartIndex: currentMemoryStartIdx + 1 }
        : state

    default:
      return state
  }
}

export const CalculatorContextProvider = props => {
  return (
    <CalculatorContext.Provider value={initialState}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
