import { maxMemoryEntries } from "../constants";


export const getValuesFrom = (arr=[], startingIndex=0) => {
  const length = arr.length;
  const maxEntriesDisplayed = 4;
  
  if (length <= maxEntriesDisplayed) {
      return arr;
  } else {
      const subset =
        startingIndex < length - maxEntriesDisplayed
          ? arr.slice(startingIndex, startingIndex + maxEntriesDisplayed)
          : arr.slice(length - maxEntriesDisplayed)
      return subset;
  }
}
