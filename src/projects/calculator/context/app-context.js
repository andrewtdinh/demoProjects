import React, { useState, createContext } from "react";
import {
  maxResultsEntries,
  maxMemoryEntries,
  displayedMemoryEntries,
  displayedResultsEntries,
} from "../constants";

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
