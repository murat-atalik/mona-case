export const convertDecimal = (value: number = 0, decimalCount: number = 2) => {
  return value.toFixed(decimalCount).replace('.', ',');
};
