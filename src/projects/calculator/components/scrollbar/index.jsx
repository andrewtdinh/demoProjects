import React from "react"
import { scrollBarBGColor, scrollBarTextColor } from "../../constants"
import Styles from "../../index.module.css"

const ScrollBar = ({
  bgColor=scrollBarBGColor,
  textColor=scrollBarTextColor,
  entries=[],
}) => {
  return (
    <div
      className={Styles.scrollBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className="shift-left">{"◀"}</div>
      <div className={Styles.scrollBarEntries}>
        {entries.map(entry => {
          return <span key={entry}>{entry}</span>
        })}
      </div>
      <div className="shift-right">{"▶"}</div>
    </div>
  )
}

export default ScrollBar
