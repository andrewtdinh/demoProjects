const Display = ({
  bgColor = displayBGColor,
  textColor = displayColor,
  displayStr = "0",
}) => {
  return (
    <div
      className={Styles.displayWrapper}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className={Styles.displayWindow}>{displayStr}</div>
    </div>
  )
}

export default Display;