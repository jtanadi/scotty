import { useState, useEffect, MouseEvent, RefObject } from "react"
import handleScroll from "../handleScroll"

type UsePanhandlerReturn = {
  mouseDown: boolean
  handleContextMenu: (ev: MouseEvent) => void
  handleMouseDown: (ev: MouseEvent) => void
  handleMouseReset: () => void
  handlePan: (ev: MouseEvent) => void
}

export default (
  docRef: RefObject<HTMLDivElement>,
  scale: number,
  presenterMode: boolean,
  isPresenter: boolean,
  scrollLeftRatio: number,
  scrollTopRatio: number,
  setScrollRatios: (left: number, top: number, broadcast: boolean) => void
): UsePanhandlerReturn => {
  const handleContextMenu = (ev: MouseEvent): void => {
    ev.preventDefault()
  }

  const [mouseDown, setMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const handleMouseDown = (ev: MouseEvent): void => {
    if (scale <= 1 || (presenterMode && !isPresenter)) return
    setMouseDown(true)
    setStartX(ev.clientX)
    setStartY(ev.clientY)
  }

  const handleMouseReset = (): void => {
    if (mouseDown) {
      setMouseDown(false)
      setStartX(0)
      setStartY(0)
    }
  }

  // default is center (0.5 of width and height)
  const handlePan = (ev: MouseEvent): void => {
    if (!mouseDown || scale <= 1) return

    const containerElmt = docRef.current

    let deltaX = startX - ev.clientX
    let deltaY = startY - ev.clientY

    containerElmt.scroll(
      containerElmt.scrollLeft + deltaX,
      containerElmt.scrollTop + deltaY
    )

    setStartX(ev.clientX)
    setStartY(ev.clientY)

    if (docRef.current) {
      const broadcast = presenterMode && isPresenter
      handleScroll(docRef.current, broadcast, setScrollRatios)
    }
  }

  const updateScrollPositions = (): void => {
    const {
      scrollWidth,
      clientWidth,
      scrollHeight,
      clientHeight,
    } = docRef.current
    const scrollLeftMax = scrollWidth - clientWidth
    const scrollTopMax = scrollHeight - clientHeight

    docRef.current.scrollLeft = scrollLeftMax * scrollLeftRatio
    docRef.current.scrollTop = scrollTopMax * scrollTopRatio
  }

  // Recenter view on zoom
  useEffect(() => {
    if (scale === 1) {
      const broadcast = presenterMode && isPresenter
      setScrollRatios(0.5, 0.5, broadcast)
    }
    updateScrollPositions()
  }, [scale])

  // Update view when in presenter mode & is not presenter
  useEffect(() => {
    if (presenterMode && !isPresenter) {
      updateScrollPositions()
    }
  }, [scrollLeftRatio, scrollTopRatio])

  return {
    mouseDown,
    handleContextMenu,
    handleMouseDown,
    handleMouseReset,
    handlePan,
  }
}
