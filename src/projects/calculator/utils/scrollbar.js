export const getLastFourValues = (arr=[]) => {
    const length = arr.length;
    const maxResultsEntries = 4;
    
    if (length <= maxResultsEntries) {
        return arr;
    } else {
        return arr.slice(length - maxResultsEntries)
    }
}
