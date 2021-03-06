export const getValuesFrom = (arr=[], startingIndex=0, maxEntriesDisplayed=4) => {
  const length = arr.length;
  
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
