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

export const convertToPercent = (decimalStr) => {
  if (!decimalStr) {
    return '0';
  }
  const chars = decimalStr.split("");
  const charsLength = chars.length;
  const oldDecimalPosition = chars.indexOf(".");
  const hasDecimalPoint = oldDecimalPosition >= 0;
  if (!hasDecimalPoint) {
    return chars.join('') + '00';
  } else {
    // For cases when number has decimal point
    chars.splice(oldDecimalPosition, 1);
    if (charsLength - oldDecimalPosition === 1) {
      // Decimal point is at the end of the number
      return chars.join('') + '00';
    } else if (charsLength - oldDecimalPosition === 2) {
      // For xxx.x numbers
      return chars.join('') + '0';
    } else if (charsLength - oldDecimalPosition === 3) {
      // For xxx.xx numbers
      return chars.join('');
    } else if (charsLength - oldDecimalPosition > 3) {
      // For all other cases
      chars.splice(oldDecimalPosition + 2, 0, ".");
      return chars.join('');
    }
  }
}

const trimLeadingZeros = (numberStr) => {
  const isNegative = numberStr[0] === "-";
  const chars = isNegative ? numberStr.split("").slice(1) : numberStr.split("");
  const charsLength = chars.length;
  if (charsLength <= 1) {
    return numberStr;
  } else {
    while (chars.length >= 2) {
      if (chars[0] === '0' && chars[1] !== '.') {
        chars.splice(0, 0);
      } else {
        break;
      }
    }
    return isNegative ? '-' + chars.join('') : chars.join('');
  }
}
