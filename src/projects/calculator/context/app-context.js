import React, { createContext } from "react";
import {
  maxResultsEntries,
  maxMemoryEntries,
  displayedMemoryEntries,
  displayedResultsEntries,
} from "../constants";
import { convertToDecimal, convertToPercent } from '../utils/convert';

const initialState = {
  displayStr: "0",
  operand1: null,
  operand2: null,
  lastResult: null,
  prevResults: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  memories: [20, 21, 22, 23, 24, 25, 26],
  operation: null,
  resultsStartIndex: 0,
  memoryStartIndex: 0,
  // We start in the percent mode and can toggle to fraction mode or back
  isPercentMode: true
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
    isPercentMode,
    displayStr
  } = state;
  const qtyPreviousResults = prevResults.length
  const qtyMemoryEntries = memories.length

  switch (action.type) {
    case "UPDATE_DISPLAY":
      return { ...state, displayStr: action.payload }

    case "UPDATE_STATE":
      return {...action.payload}

    case "SHIFT_RESULTS_LEFT":
      return currentResultsStartIdx === 0
        ? state
        : { ...state, resultsStartIndex: currentResultsStartIdx - 1 }

    case "SHIFT_RESULTS_RIGHT":
      return qtyPreviousResults < maxResultsEntries
        ? currentResultsStartIdx < qtyPreviousResults - displayedResultsEntries
          ? { ...state, resultsStartIndex: currentResultsStartIdx + 1 }
          : state
        : currentResultsStartIdx < maxResultsEntries - displayedResultsEntries
        ? { ...state, resultsStartIndex: currentResultsStartIdx + 1 }
        : state

    case "SHIFT_MEMORY_LEFT":
      return currentMemoryStartIdx === 0
        ? state
        : { ...state, memoryStartIndex: currentMemoryStartIdx - 1 }

    case "SHIFT_MEMORY_RIGHT":
      return qtyMemoryEntries < maxMemoryEntries
        ? currentMemoryStartIdx < qtyMemoryEntries - displayedMemoryEntries
          ? { ...state, memoryStartIndex: currentMemoryStartIdx + 1 }
          : state
        : currentMemoryStartIdx < maxMemoryEntries - displayedMemoryEntries
        ? { ...state, memoryStartIndex: currentMemoryStartIdx + 1 }
        : state

    case "MEMORY_IN":
      const isMaxMemoryReached = qtyMemoryEntries >= maxMemoryEntries;
      const newMemoryArray = isMaxMemoryReached
        ? [...memories, action.payload].slice(1)
        : [...memories, action.payload]
      return { ...state, memoryStartIndex: currentMemoryStartIdx + 1, memories: newMemoryArray }

    case "RESULTS_IN":
      const isMaxResultsReached = qtyPreviousResults >= maxResultsEntries;
      const newResultsArray = isMaxResultsReached
        ? [...prevResults, action.payload].slice(1)
        : [...prevResults, action.payload]
      return { ...state, resultsStartIndex: currentResultsStartIdx + 1, prevResults: newResultsArray }

    case "CONVERT_TO_DECIMAL":
      return { ...state, isPercentMode: !isPercentMode, displayStr: convertToDecimal(displayStr) }

    case "CONVERT_TO_PERCENT":
      return { ...state, isPercentMode: !isPercentMode, displayStr: convertToPercent(displayStr) }

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
