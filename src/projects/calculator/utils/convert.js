export const convertToDecimal = (percentStr) => {
  if (!percentStr) {
    return '0.0';
  } 
  const isNegative = percentStr[0] === '-';
  const chars = isNegative ? percentStr.split('').slice(1) : percentStr.split('');
  const charsLength = chars.length;
  const oldDecimalPosition = chars.indexOf('.');
  const hasDecimalPoint = oldDecimalPosition >= 0;
  if (!hasDecimalPoint) {
    // For cases where there is no decimal point
    if (charsLength === 1 && chars[0] === '0') {
      return '0.00';
    } else if (charsLength === 1) {
      return isNegative ? '-0.0' + chars[0] : '0.0' + chars[0]
    } else if (charsLength === 2) {
      return isNegative ? '-0.' + chars.join('') : '0.' + chars.join('')
    } else if (charsLength > 2) {
      chars.splice(charsLength - 2, 0, '.');
      return isNegative ? '-' + chars.join('') : chars.join('')
    }
  } else {
    // For cases with decimal point
    if (oldDecimalPosition === 0) {
      chars.shift();
      return isNegative ? '-0.00' + chars.join('') : '0.00' + chars.join('')
    } else {
      chars.splice(oldDecimalPosition, 1)
      if (oldDecimalPosition === 1) {
        return isNegative ? "-0.0" + chars.join("") : "0.0" + chars.join("")
      } else if (oldDecimalPosition === 2) {
        return isNegative ? "-0." + chars.join("") : "0." + chars.join("")
      } else if (oldDecimalPosition >= 3) {
        chars.splice(oldDecimalPosition - 2, 0, ".")
        return isNegative ? "-" + chars.join("") : chars.join("")
      }
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
