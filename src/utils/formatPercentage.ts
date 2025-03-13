export const formatPercentage = (num: number = 0): string => {
  return `${num < 0 ? '-' : ''}%${Math.abs(num)}`;
};
