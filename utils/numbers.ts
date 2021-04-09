export function RoundBigNumber(value: number | string) {
  const num = +value
  return num >= 1.0e12
    ? (num / 1.0e12).toFixed(2) + 'T' // Trillions
    : num >= 1.0e9
    ? (num / 1.0e9).toFixed(2) + 'B' // Billions
    : num >= 1.0e6
    ? (num / 1.0e6).toFixed(2) + 'M' // Millions
    : num >= 1.0e3
    ? (num / 1.0e3).toFixed(2) + 'K' // Thousands
    : `${num}` // Hundreds
}

export function RoundBigNumberNoLetter(value: number | string) {
  const num = +value
  return num >= 1.0e12
    ? (num / 1.0e12).toFixed(2) // Trillions
    : num >= 1.0e9
    ? (num / 1.0e9).toFixed(2) // Billions
    : num >= 1.0e6
    ? (num / 1.0e6).toFixed(2) // Millions
    : num >= 1.0e3
    ? (num / 1.0e3).toFixed(2) // Thousands
    : `${num}` // Hundreds
}
