import React, { useContext } from "react"
import { resultsBarBGColor, resultsTextColor } from "../../buttons";
import Styles from "../../index.module.css";
import ScrollBar from "../scrollbar";
import { AppContext } from '../../index';

const ResultsBar = ({
  bgColor = resultsBarBGColor,
  textColor = resultsTextColor,
  results = [1,2,3,4,5,6,7],
}) => {
  const displayedResults = results;
  const { onResultsShiftLeftClick, onResultsShiftRightClick } = useContext(AppContext);

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
      <ScrollBar 
        entries={displayedResults}
        onShiftLeftClick={onResultsShiftLeftClick}
        onShiftRightClick={onResultsShiftRightClick}
      />
    </div>
  )
}

export default ResultsBar;