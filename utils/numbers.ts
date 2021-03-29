export function RoundBigNumber(value: number) {
  return value >= 1.0e12
    ? (value / 1.0e12).toFixed(2) + 'T' // Trillions
    : value >= 1.0e9
    ? (value / 1.0e9).toFixed(2) + 'B' // Billions
    : value >= 1.0e6
    ? (value / 1.0e6).toFixed(2) + 'M' // Millions
    : value >= 1.0e3
    ? (value / 1.0e3).toFixed(2) + 'K' // Thousands
    : `${value}` // Hundreds
}
