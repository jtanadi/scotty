export default (
  div: HTMLDivElement,
  broadcast: boolean,
  setScrollRatios: (left: number, top: number, broadcast: boolean) => void
): void => {
  const {
    scrollLeft,
    scrollWidth,
    clientWidth,
    scrollTop,
    scrollHeight,
    clientHeight,
  } = div

  const scrollLeftMax = scrollWidth - clientWidth
  const scrollTopMax = scrollHeight - clientHeight

  const left = scrollLeft / scrollLeftMax
  const top = scrollTop / scrollTopMax

  setScrollRatios(left, top, broadcast)
}
