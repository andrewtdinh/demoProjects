import React from "react"
import { resultsBarBGColor, resultsTextColor } from "../../buttons";
import Styles from "../../index.module.css";

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
      <div className={Styles.resultsBarLabel}>
        Results:
      </div>
      <div></div>
    </div>
  )
}

export default ResultsBar;