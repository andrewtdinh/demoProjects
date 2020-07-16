import React, { useContext } from 'react';
import { memoryBarBGColor, memoryTextColor } from '../../buttons';
import Styles from "../../index.module.css";
import { CalculatorContext } from "../../context/app-context";
import { getValuesFrom } from "../../utils/scrollbar";
import ScrollBar from "../scrollbar";
import { displayedMemoryEntries } from "../../constants"

const MemoryBar = ({
  bgColor = memoryBarBGColor,
  textColor = memoryTextColor,
  memories = [],
  memoryStartIndex=0,
  onMemoryShiftLeftClick,
  onMemoryShiftRightClick,
}) => {
  const displayedMemories = getValuesFrom(
    memories,
    memoryStartIndex,
    displayedMemoryEntries
  );

  return (
    <div
      className={Styles.memoryBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className={Styles.memoryBarLabel}>Mem:</div>
      <ScrollBar 
        entries={displayedMemories}
        onShiftLeftClick={onMemoryShiftLeftClick}
        onShiftRightClick={onMemoryShiftRightClick}
      />
    </div>
  )
}

export default MemoryBar;
