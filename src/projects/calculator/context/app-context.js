import React, { useState, createContext } from "react"

// Create Calculator Object
export const CalculatorContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CalculatorContextProvider = props => {
  const [count, setCount] = useState(0)

  return (
    <CalculatorContext.Provider value={[count, setCount]}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
