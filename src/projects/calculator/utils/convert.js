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

export const convertToPercent = (fractionStr) => {
  const parts = fractionStr.split('.');
  const secondPartLength = parts[1].length;
  if (secondPartLength === 0) {
    return parts[0] + '00.0';
  } else if (secondPartLength === 1) {
    return parts[0] + parts[1] + '0.0';
  } else if (secondPartLength === 2) {
    return parts[0] + parts[1] + '.0';
  } else {
    return parts[0] + parts[1].splice(2, 0, '.')
  }
}
