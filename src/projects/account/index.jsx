import React from "react"
import Styles from "./index.module.css"
import Widget from "./components/widget"
import { ContextProvider } from "./AccountContext"

const Account = () => {
  return (
    <ContextProvider>
      <div className={Styles.container}>
        <h3>Account Dashboard</h3>
        <Widget />
      </div>
    </ContextProvider>
  )
}

export default Account
