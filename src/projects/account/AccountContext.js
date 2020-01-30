import React from "react";

const initialState = { count: 0 };

const AccountContext = React.createContext(initialState)

function ContextProvider(props) {
  return (
    <AccountContext.Provider value={initialState}>
      {props.children}
    </AccountContext.Provider>
  )
}
export { AccountContext, ContextProvider }
