import React from "react"
import { displayBGColor, displayColor } from "../../buttons";
import Styles from '../../index.module.css';

const Display = ({
  bgColor = displayBGColor,
  textColor = displayColor,
  displayStr = "0",
}) => {
  const displayMode = <div className={Styles.displayMode}></div>;
  return (
    <div
      className={Styles.displayWrapper}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className={Styles.displayWindow}>{displayStr}</div>
      {displayMode}
    </div>
  )
}

export default Display;