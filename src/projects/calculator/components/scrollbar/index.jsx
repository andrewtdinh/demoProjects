import React from "react"
import { scrollBarBGColor, scrollBarTextColor } from "../../constants"
import Styles from "../../index.module.css"

const ScrollBar = ({
  bgColor = scrollBarBGColor,
  textColor = scrollBarTextColor,
  entries = [],
}) => {
  return (
    <div
      className={Styles.scrollBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div>{"<"}</div>
      <div className={Styles.scrollBarEntries}>
        Entry
      </div>
      <div>{">"}</div>
    </div>
  )
}

export default ScrollBar
