import { useState, useEffect, RefObject } from "react"

import { MouseMoveData } from "../../../../../backend/src/sockets/types"
import roundTo from "../../../utils/roundTo"
import socket from "../../../socket"

const roundTo3 = roundTo(3)

type UsePointerReturn = {
  showMouse: boolean
  handlePointerToggle: () => void
  ownMouseX: number
  ownMouseY: number
}

export default (
  roomID: string,
  pageRef: RefObject<HTMLImageElement>
): UsePointerReturn => {
  const [ownMouseX, setOwnMouseX] = useState(0)
  const [ownMouseY, setOwnMouseY] = useState(0)

  const handleMouseMove = (ev?: MouseEvent): void => {
    if (!pageRef.current) return

    const {
      offsetLeft,
      clientWidth,
      offsetTop,
      clientHeight,
      offsetParent,
    } = pageRef.current

    const container = offsetParent as HTMLDivElement
    const mouseX: number = ev
      ? roundTo3((ev.clientX - offsetLeft) / clientWidth)
      : null
    const mouseY: number = ev
      ? roundTo3((ev.clientY - offsetTop - container.offsetTop) / clientHeight)
      : null

    const mouseMoveData: MouseMoveData = {
      roomID,
      mouseX,
      mouseY,
    }

    setOwnMouseX(ev ? roundTo3(ev.clientX) : 0)
    setOwnMouseY(ev ? roundTo3(ev.clientY) : 0)
    socket.emit("mousemove", mouseMoveData)
  }

  const [showMouse, setShowMouse] = useState(false)
  useEffect(() => {
    if (showMouse) {
      document.addEventListener("mousemove", handleMouseMove)
    } else {
      handleMouseMove()
    }

    return (): void => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [showMouse])

  const handlePointerToggle = (): void => {
    setShowMouse(prev => !prev)
  }

  return { showMouse, handlePointerToggle, ownMouseX, ownMouseY }
}
