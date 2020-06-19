import React, { useContext } from 'react';
import { memoryBarBGColor, memoryTextColor } from '../../buttons';
import Styles from "../../index.module.css";
import { CalculatorContext } from "../../context/app-context";

const MemoryBar = ({
  bgColor = memoryBarBGColor,
  textColor = memoryTextColor,
  children,
  memories = []
}) => {
  const { onMemoryShiftLeftClick, onMemoryShiftRightClick } = useContext(CalculatorContext);

  return (
    <div
      className={Styles.memoryBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className={Styles.memoryBarLabel} >
        Mem:
      </div>
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