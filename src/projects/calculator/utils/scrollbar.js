export const getValuesFrom = (arr=[], startingIndex) => {
    const length = arr.length;
    const maxResultsEntries = 4;
    
    if (length <= maxResultsEntries) {
        return arr;
    } else {
        const startIndex =
          startingIndex && startingIndex <= length - maxResultsEntries
            ? startingIndex
            : (length - maxResultsEntries)
        return arr.slice(startIndex)
    }
}
