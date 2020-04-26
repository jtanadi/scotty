import React, {
  FC,
  ReactElement,
  MouseEvent,
  useState,
  RefObject,
  useRef,
} from "react"

import { DocumentContainer, PageContainer, Page } from "./styles"

type PropTypes = {
  src: string
  scale: number
  pageRef: RefObject<HTMLImageElement>
}

const View: FC<PropTypes> = ({ src, scale, pageRef }): ReactElement => {
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
      <PageContainer
        onContextMenu={handleContextMenu}
        onMouseMove={handlePan}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseReset}
        onMouseLeave={handleMouseReset}
      >
        <Page
          src={src}
          ref={pageRef}
          scale={scale}
          mouseDown={mouseDown}
          draggable={false}
        />
      </PageContainer>
    </DocumentContainer>
  )
}

export default View
