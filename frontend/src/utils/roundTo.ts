export default (decimalPlaces: number): ((num: number) => number) => {
  if (decimalPlaces < 0) throw new Error("decimalPlaces must be >= 0")
  return (num: number): number => {
    const multiplier = 10 ** decimalPlaces
    return Math.round(num * multiplier) / multiplier
  }
}
