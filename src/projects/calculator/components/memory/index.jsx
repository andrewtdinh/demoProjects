import React from 'react';
import { memoryBarBGColor, memoryTextColor } from '../../buttons';
import Styles from "../../index.module.css"

const MemoryBar = ({
  bgColor = memoryBarBGColor,
  textColor = memoryTextColor,
  memories = [],
}) => {
  return (
    <div
      className={Styles.memoryBar}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div>Memory:</div>
      <div className={Styles.memoryCells}>
        {memories.map((memValue, idx) => {
          return <div key={`${idx}:${memValue}`}>{memValue}</div>
        })}
      </div>
    </div>
  )
}

export default MemoryBar;