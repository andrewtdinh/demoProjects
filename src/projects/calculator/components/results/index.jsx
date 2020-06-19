import React, { useContext } from "react"
import { resultsBarBGColor, resultsTextColor } from "../../buttons";
import Styles from "../../index.module.css";
import ScrollBar from "../scrollbar";
import { CalculatorContext } from '../../context/app-context';
import { getValuesFrom } from '../../utils/scrollbar';

const ResultsBar = ({
  bgColor = resultsBarBGColor,
  textColor = resultsTextColor,
  results = [0,1,2,3,4,5,6,7,8,9],
}) => {
  console.log({CalculatorContext})
  const { onResultsShiftLeftClick, onResultsShiftRightClick, resultsStartIndex } = useContext(CalculatorContext);
  const displayedResults = getValuesFrom(results, resultsStartIndex);

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