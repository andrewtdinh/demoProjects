export const whiteText = "#FFFFFF";
export const displayBGColor = "#6d6866"
export const memoryBarBGColor = "#6d6866"
export const memoryTextColor = whiteText;
export const resultsBarBGColor = "#6d6866"
export const resultsTextColor = whiteText;
export const displayColor = whiteText;
export const orangeOperatorColor = "#f5993b"
export const blueButtonColor = "#9dc2d4"
export const redOperatorColor = "#e0301e"
export const yellowOperatorColor = "#fffc9a"

export const buttons = [
  // The MEM+ button is special because its background is orange, but its type is
  // orange-button, not orange-operator-button because we need its font to be smaller 
  {
    name: "Save To Memory Button",
    label: "MEM+",
    color: whiteText,
    bgColor: orangeOperatorColor,
    type: "orange-button",
  },
  {
    name: "Sign Toggle Operator",
    label: "±",
    color: whiteText,
    bgColor: orangeOperatorColor,
    type: "orange-operator-button",
  },
  {
    name: "Clear Display Operator",
    label: "CLR",
    color: whiteText,
    bgColor: redOperatorColor,
    type: "clear-button",
  },
  {
    name: "Delete Last Character Button",
    label: "⌫",
    color: whiteText,
    bgColor: redOperatorColor,
    type: "delete-button",
  },
  {
    name: "Number One Button",
    label: "1",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    rowSpan: 2,
    value: "1",
  },
  {
    name: "Number Two Button",
    label: "2",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    rowSpan: 2,
    value: "2",
  },
  {
    name: "Number Three Button",
    label: "3",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    rowSpan: 2,
    value: "3",
  },
  {
    name: "Square Root Operator",
    label: "➡ %",
    color: whiteText,
    bgColor: orangeOperatorColor,
    type: "orange-operator-button",
  },
  {
    name: "Percent Of Operator",
    label: "% of",
    color: whiteText,
    bgColor: orangeOperatorColor,
    type: "orange-operator-button",
  },
  {
    name: "Number Four Button",
    label: "4",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    value: "4",
    rowSpan: 2,
  },
  {
    name: "Number Five Button",
    label: "5",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    value: "5",
    rowSpan: 2,
  },
  {
    name: "Number Six Button",
    label: "6",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    value: "6",
    rowSpan: 2,
  },
  {
    name: "Multiplication Operator",
    label: "X",
    color: "#FFF",
    bgColor: orangeOperatorColor,
    type: "orange-operator-button",
  },
  {
    name: "Division Operator",
    label: "/",
    color: "#FFF",
    bgColor: orangeOperatorColor,
    type: "orange-operator-button",
  },
  {
    name: "Number Seven Button",
    label: "7",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    value: "7",
    rowSpan: 2,
  },
  {
    name: "Number Eight Button",
    label: "8",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    value: "8",
    rowSpan: 2,
  },
  {
    name: "Number Nine Button",
    label: "9",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    value: "9",
    rowSpan: 2,
  },
  {
    name: "Addition Operator",
    label: "+",
    color: "#FFF",
    bgColor: orangeOperatorColor,
    type: "orange-operator-button",
  },
  {
    name: "Subtraction Operator",
    label: "–",
    color: "#FFF",
    bgColor: orangeOperatorColor,
    type: "orange-operator-button",
  },
  {
    name: "Number 0 Button",
    label: "0",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    columnSpan: 2,
    rowSpan: 2,
    value: "0",
  },
  {
    name: "Period Button",
    label: ".",
    color: "rgba(84,103,112,.83)",
    bgColor: blueButtonColor,
    type: "blue-button",
    value: ".",
    rowSpan: 2,
  },
  {
    name: "Equal Operator",
    label: "=",
    color: "#FFF",
    bgColor: orangeOperatorColor,
    type: "orange-operator-button",
    rowSpan: 2,
  },
]
