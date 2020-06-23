

export const getValuesFrom = (arr=[], startingIndex) => {
  const length = arr.length;
  const maxEntriesDisplayed = 4;
  
  
  if (length <= maxEntriesDisplayed) {
      return arr;
  } else {
      const startIndex = startingIndex
        ? startingIndex <= length - maxEntriesDisplayed
          ? startingIndex
          : length - maxEntriesDisplayed
        : length - maxEntriesDisplayed;
      console.log({ startIndex, length, maxEntriesDisplayed, arr })
      return arr.slice(startIndex)
  }
}
