import React from "react"
import { displayBGColor, displayColor } from "../../buttons"
import Styles from "../../index.module.css"

const DisplayFeatures = ({
  bgColor=displayBGColor,
  textColor=displayColor,
  children,
}) => {
  return (
    <div
      className={Styles.displayFeaturesBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {children}
    </div>
  )
}

export default DisplayFeatures;
