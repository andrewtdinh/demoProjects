import React, { Children, useContext } from 'react';
import { memoryBarBGColor, memoryTextColor } from '../../buttons';
import Styles from "../../index.module.css";
import { AppContext } from "../../index";

const MemoryBar = ({
  bgColor = memoryBarBGColor,
  textColor = memoryTextColor,
  children,
  memories = []
}) => {
  const { onMemoryShiftLeftClick, onMemoryShiftRightClick } = useContext(AppContext);

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