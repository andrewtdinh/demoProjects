export const convertToFraction = (percentStr) => {
  const parts = percentStr.split('.');
  const firstPartLength = parts[0].length;
  if (firstPartLength === 0) {
    return "0.00" + parts[1]
  } else if (firstPartLength === 1) {
    return "0.0" + parts[0] + parts[1]
  } else {
    return parts[0].splice(firstPartLength - 2, 0, '.') + parts[1];
  }
}
