export const convertToDecimal = (percentStr) => {
  if (!percentStr) {
    return '0.0';
  } 
  const chars = percentStr.split('');
  const charsLength = chars.length;
  const oldDecimalPosition = chars.indexOf('.');
  const hasDecimalPoint = oldDecimalPosition >= 0;
  if (!hasDecimalPoint) {
    if (charsLength === 1 && chars[0] === '0') {
      return '0';
    } else if (charsLength === 1) {
      return '0.0' + chars[0];
    } else if (charsLength === 2) {
      return '0.' + chars.join('');
    } else if (charsLength > 2) {
      chars.splice(charsLength - 2, 0, '.');
      return chars.join('');
    }
  }
}

export const convertToPercent = (decimalStr='0.0') => {
  const parts = decimalStr.split('.');
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
