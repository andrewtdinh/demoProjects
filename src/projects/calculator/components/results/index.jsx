import React, { useState } from "react"
import { resultsBarBGColor, resultsTextColor } from "../../buttons";
import Styles from "../../index.module.css";
import ScrollBar from "../scrollbar";

const ResultsBar = ({
  bgColor = resultsBarBGColor,
  textColor = resultsTextColor,
  results = [],
}) => {
  const displayedResults = results;
  return (
    <div
      className={Styles.resultsBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className={Styles.resultsBarLabel}>
        Res:
      </div>
      <ScrollBar entries={displayedResults} />
    </div>
  )
}

export default ResultsBar;