type Padding = {
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export const sumPadding = (padding: Padding): number => {
  return Object.values(padding).reduce((acc, _padding) => {
    const p = parseFloat(_padding.replace("px", ""))
    return acc + p
  }, 0)
}
