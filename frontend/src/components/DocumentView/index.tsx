import React, { FC, ReactElement, MouseEvent, useState, useRef } from "react"

import { DocumentContainer, Page } from "./styles"

type PropTypes = {
  src: string
  scale: number
}

const View: FC<PropTypes> = ({ src, scale }): ReactElement => {
  const containerRef = useRef(null)
  const handleContextMenu = (ev: MouseEvent): void => {
    ev.preventDefault()
  }

  const [mouseDown, setMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const handleMouseDown = (ev: MouseEvent): void => {
    if (scale <= 1) return
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

  const handlePan = (ev: MouseEvent): void => {
    if (!mouseDown || scale <= 1) return

    const containerElmt = containerRef.current

    let deltaX = startX - ev.clientX
    let deltaY = startY - ev.clientY

    containerElmt.scroll(
      containerElmt.scrollLeft + deltaX,
      containerElmt.scrollTop + deltaY
    )

    setStartX(ev.clientX)
    setStartY(ev.clientY)
  }

  return (
    <DocumentContainer ref={containerRef} scale={scale}>
      <Page
        src={src}
        scale={scale}
        mouseDown={mouseDown}
        onContextMenu={handleContextMenu}
        draggable={false}
        onMouseMove={handlePan}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseReset}
        onMouseLeave={handleMouseReset}
      />
    </DocumentContainer>
  )
}

export default View
