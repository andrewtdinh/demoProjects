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
  onScrollBarEntryClick
}) => {
  const displayedMemories = getValuesFrom(
    memories,
    memoryStartIndex,
    displayedMemoryEntries
  );
  const numMemoryEntries = memories.length;
  const isLeftShiftBtnDisabled = numMemoryEntries <= displayedMemoryEntries || memoryStartIndex === 0;
  const isRightShiftBtnDisabled = 
    numMemoryEntries <= displayedMemoryEntries || 
    memoryStartIndex >= numMemoryEntries - displayedMemoryEntries;


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
        onScrollBarEntryClick={onScrollBarEntryClick}
      />
    </div>
  )
}

export default MemoryBar;
