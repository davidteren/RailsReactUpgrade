export const formatPercentage = (percentage: number, precision = 1): string =>
  `${(100 * percentage).toFixed(precision)}%`
