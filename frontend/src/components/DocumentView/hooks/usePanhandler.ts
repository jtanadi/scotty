import { useState, useEffect, MouseEvent, RefObject } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setScrollRatios } from "../../../store/actions"
import { RootState } from "../../../store/types"

type UsePanhandlerReturn = {
  mouseDown: boolean
  handleContextMenu: (ev: MouseEvent) => void
  handleMouseDown: (ev: MouseEvent) => void
  handleMouseReset: () => void
  handlePan: (ev: MouseEvent) => void
}

export default (
  docRef: RefObject<HTMLDivElement>,
  socketUpdateScroll: (left: number, top: number) => void
): UsePanhandlerReturn => {
  const dispatch = useDispatch()
  const zoomLevel = useSelector((state: RootState) => state.zoom.zoomLevel)
  const presenterMode = useSelector(
    (state: RootState) => !!state.room.presenterID
  )
  const isPresenter = useSelector(
    (state: RootState) => state.room.userID === state.room.presenterID
  )
  const scrollLeftRatio = useSelector(
    (state: RootState) => state.zoom.scrollLeftRatio
  )
  const scrollTopRatio = useSelector(
    (state: RootState) => state.zoom.scrollTopRatio
  )

  const handleContextMenu = (ev: MouseEvent): void => {
    ev.preventDefault()
  }

  const [mouseDown, setMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const handleMouseDown = (ev: MouseEvent): void => {
    if (zoomLevel <= 1 || (presenterMode && !isPresenter)) return
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
    if (!mouseDown || zoomLevel <= 1) return

    const containerElmt = docRef.current

    let deltaX = startX - ev.clientX
    let deltaY = startY - ev.clientY

    containerElmt.scroll(
      containerElmt.scrollLeft + deltaX,
      containerElmt.scrollTop + deltaY
    )

    setStartX(ev.clientX)
    setStartY(ev.clientY)
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
    if (zoomLevel === 1) {
      const broadcast = presenterMode && isPresenter
      const defaultScrollRatio = 0.5

      dispatch(setScrollRatios(defaultScrollRatio, defaultScrollRatio))
      if (broadcast) {
        socketUpdateScroll(defaultScrollRatio, defaultScrollRatio)
      }
    }
    updateScrollPositions()
  }, [zoomLevel])

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
