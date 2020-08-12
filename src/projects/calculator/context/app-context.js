import React, { createContext } from "react";
import { add, subtract, multiply, divide } from 'mathjs/number';
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
  prevResults: [],
  memories: [],
  pendingOp: null,
  resultsStartIndex: 0,
  memoryStartIndex: 0,
  shouldDisplayResetOnNext: false,
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
    displayStr
  } = state;
  const { type, payload } = action;
  const qtyPreviousResults = prevResults.length
  const qtyMemoryEntries = memories.length
  let nextState;

  switch (type) {
    case "UPDATE_DISPLAY":
      return { ...state, displayStr: payload }

    case "UPDATE_STATE":
      return {...payload}

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
        ? [...memories, payload].slice(1)
        : [...memories, payload]
      const newMemoryStartIdx = newMemoryArray.length - displayedMemoryEntries >= 0 
        ? newMemoryArray.length - displayedMemoryEntries
        : 0
      return { ...state, memoryStartIndex: newMemoryStartIdx, memories: newMemoryArray }

    case "RESULTS_IN":
      const isMaxResultsReached = qtyPreviousResults >= maxResultsEntries;
      const newResultsArray = isMaxResultsReached
        ? [...prevResults, payload].slice(1)
        : [...prevResults, payload]
      const newResultsStartIdx = newResultsArray.length - displayedResultsEntries >= 0
        ? newResultsArray.length - displayedResultsEntries
        : 0
      return { ...state, resultsStartIndex: newResultsStartIdx, prevResults: newResultsArray }

    case "CLEAR_OPERAND":
      nextState = payload === 1
        ? { ...state, operand1: ''}
        : { ...state, operand2: ''};
      return nextState;
    
    case "SET_OPERAND":
      const { operandOrder, value } = payload;
      nextState = operandOrder === 1
        ? { ...state, operand1: value}
        : { ...state, operand2: value};
      return nextState;

    case "UPDATE_OPERAND_AND_DISPLAY_VALUE":
      const { operandNum, operandValue, nextDisplayValue, shouldDisplayResetOnNext } = payload;
      nextState = operandNum === 1
        ? { ...state, operand1: operandValue, displayStr: nextDisplayValue, shouldDisplayResetOnNext }
        : { ...state, operand2: operandValue, displayStr: nextDisplayValue, shouldDisplayResetOnNext }
      return nextState;

    case "ADD_DECIMAL_POINT":
      return { 
        ...state,
        displayStr: payload.nextDisplayValue,
        shouldDisplayResetOnNext : payload.shouldDisplayResetOnNext
      }

    case "UNRESET_DISPLAY_ON_NEXT_CLICK":
      return { ...state, shouldDisplayResetOnNext: false }

    case "UPDATE_PENDING_OPERATION":
      return { ...state, pendingOp: payload }

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

export const executeOperation = (op, operand1, operand2) => {
  switch (op) {
    case '+':
      return add((operand1 * 1), (operand2 * 1))

    case '-':
      return subtract((operand1 * 1), (operand2 * 1))

    case 'x':
      return multiply((operand1 * 1), (operand2 * 1))

    case ':':
      if (operand2 * 1 === 0) {
        return 'ERROR: Divide by zero'
      }
      return divide((operand1 * 1), (operand2 * 1));
  }
}
