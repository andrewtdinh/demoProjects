import React, { useState, createContext } from "react";
import {
  maxResultsEntries,
  maxMemoryEntries,
  displayedMemoryEntries,
  displayedResultsEntries,
} from "../constants";

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
  const {
    resultsStartIndex: currentResultsStartIdx,
    memoryStartIndex: currentMemoryStartIdx,
  } = calcState;

  // TODO: have the displayResults array in state and change it when people shift results left or right
  const onResultsShiftLeftClick = (e) => {
    e.preventDefault()
    console.log({currentResultsStartIdx})
    return currentResultsStartIdx === 0
      ? null
      : setCalcState({ ...calcState, resultsStartIndex: currentResultsStartIdx - 1});
  }

  const onResultsShiftRightClick = (e) => {
    const { prevResults } = calcState;
    const qtyPreviousResults = prevResults.length;
    console.log({prevResults})

    e.preventDefault()
    return qtyPreviousResults < maxResultsEntries
      ? currentResultsStartIdx < qtyPreviousResults - displayedResultsEntries
        ? setCalcState({ ...calcState, resultsStartIndex: currentResultsStartIdx + 1})
        : null
      : currentResultsStartIdx < maxResultsEntries - displayedResultsEntries
        ? setCalcState({ ...calcState, resultsStartIndex: currentResultsStartIdx + 1})
        : null
  }

  const onMemoryShiftLeftClick = (e) => {
    e.preventDefault()
    return currentMemoryStartIdx === 0
      ? null
      : setCalcState({ ...calcState, memoryStartIndex: currentMemoryStartIdx - 1 });
  }

  const onMemoryShiftRightClick = (e) => {
    const { memories } = calcState;
    const qtyMemoryEntries = memories.length;

    e.preventDefault()
    return qtyMemoryEntries < maxMemoryEntries
      ? currentMemoryStartIdx < qtyMemoryEntries - displayedMemoryEntries
        ? setCalcState({ ...calcState, memoryStartIndex: currentMemoryStartIdx + 1 })
        : null
      : currentMemoryStartIdx < maxMemoryEntries - displayedMemoryEntries
        ? setCalcState({ ...calcState, memoryStartIndex: currentMemoryStartIdx + 1 })
        : null
  }

  return (
    <CalculatorContext.Provider value={[ calcState, setCalcState ]}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
