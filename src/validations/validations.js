export const isNumber = (value, max = null, min = null) => {
  const number = Number(value);
  if (isNaN(number)) {
    return false;
  }
  if (min !== null && number < min) {
    return false;
  }
  if (max !== null && number > max) {
    return false;
  }
  return true;
};

export const isDistribution = (value) => {
  const parts = value.split("/");
  if (parts.length !== 2) {
    return false;
  }
  const [first, second] = parts.map(Number);
  return !isNaN(first) && !isNaN(second) && first + second === 100;
};
