export type Padding = {
  top: string
  right: string
  bottom: string
  left: string
}

export const sumPadding = (...paddings: Array<string>): number => {
  return paddings.reduce((acc, _padding) => {
    const p = parseFloat(_padding.replace("px", ""))
    return acc + p
  }, 0)
}
