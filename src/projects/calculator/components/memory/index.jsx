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
  children,
  memories = [],
  memoryStartIndex,
  onMemoryShiftLeftClick,
  onMemoryShiftRightClick,
}) => {
  const displayedMemories = getValuesFrom(
    memories,
    onMemoryShiftLeftClick,
    displayedMemoryEntries
  )

  return (
    <div
      className={Styles.memoryBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className={Styles.memoryBarLabel}>Mem:</div>
      <ScrollBar />
    </div>
  )
}

const temp = ({ children, memories}) => {
  return (
    <div>
      <div className={Styles.memoryCells}>
        {memories.map((memValue, idx) => {
          return <div key={`${idx}:${memValue}`}>{memValue}</div>
        })}
      </div>
      {children}
    </div>
  )
}

export default MemoryBar;
