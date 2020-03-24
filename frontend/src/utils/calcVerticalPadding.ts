type VPadding = {
  paddingTop?: string
  paddingBottom?: string
}
export const calcVerticalPadding = (vPadding: VPadding): number => {
  return Object.values(vPadding).reduce((acc, padding) => {
    const p = parseFloat(padding.replace("px", ""))
    return acc + p
  }, 0)
}
