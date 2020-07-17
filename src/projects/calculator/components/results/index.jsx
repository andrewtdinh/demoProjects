import React from "react"
import { resultsBarBGColor, resultsTextColor } from "../../buttons";
import Styles from "../../index.module.css";
import ScrollBar from "../scrollbar";
import { getValuesFrom } from '../../utils/scrollbar';
import { displayedResultsEntries } from '../../constants';

const ResultsBar = ({
  bgColor = resultsBarBGColor,
  textColor = resultsTextColor,
  prevResults = [],
  resultsStartIndex = 0,
  onResultsShiftLeftClick,
  onResultsShiftRightClick,
  onScrollBarEntryClick,
}) => {
  const displayedResults = getValuesFrom(prevResults, resultsStartIndex, displayedResultsEntries);

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
        onScrollBarEntryClick={onScrollBarEntryClick}
      />
    </div>
  )
}

export default ResultsBar;