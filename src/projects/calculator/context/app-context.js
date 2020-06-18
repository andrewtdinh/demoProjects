import React, { useState, createContext } from "react";
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
export const CalculatorContext = createContext(initialState, () => {});


// Create a provider for components to consume and subscribe to changes
export const CalculatorContextProvider = props => {

  const [ calcState, setCalcState ] = useState(initialState);
  const {
    resultsStartIndex: currentResultsStartIdx,
    memoryStartIndex: currentMemoryStartIdx,
  } = calcState;

  return (
    <CalculatorContext.Provider value={[ calcState, setCalcState ]}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
