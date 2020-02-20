import React from "react"
import { resultsBarBGColor, resultsTextColor } from "../buttons"

const ResultsBar = ({
  bgColor = resultsBarBGColor,
  textColor = resultsTextColor,
  results = [],
}) => {
  return (
    <div
      className={Styles.resultsBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div></div>
    </div>
  )
}

export default ResultsBar;