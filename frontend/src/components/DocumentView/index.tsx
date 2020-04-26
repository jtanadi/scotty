import React, {
  FC,
  ReactElement,
  MouseEvent,
  useState,
  RefObject,
  useRef,
  useEffect,
} from "react"

import { DocumentContainer, PageContainer, Page } from "./styles"

type PropTypes = {
  src: string
  scale: number
  pageRef: RefObject<HTMLImageElement>
}

const View: FC<PropTypes> = ({ src, scale, pageRef }): ReactElement => {
  const docRef = useRef(null)
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

  // default is center (0.5 of width and height)
  const [scrollLeftRatio, setScrollLeftRatio] = useState(0.5)
  const [scrollTopRatio, setScrollTopRatio] = useState(0.5)
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
      const {
        scrollLeft,
        scrollWidth,
        clientWidth,
        scrollTop,
        scrollHeight,
        clientHeight,
      } = docRef.current

      const scrollLeftMax = scrollWidth - clientWidth
      const scrollTopMax = scrollHeight - clientHeight

      setScrollLeftRatio(scrollLeft / scrollLeftMax)
      setScrollTopRatio(scrollTop / scrollTopMax)
    }
  }

  useEffect(() => {
    if (scale === 1) {
      setScrollLeftRatio(0.5)
      setScrollTopRatio(0.5)
    }

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
  }, [scale])

  return (
    <DocumentContainer ref={docRef} scale={scale}>
      <PageContainer
        scale={scale}
        mouseDown={mouseDown}
        onContextMenu={handleContextMenu}
        onMouseMove={handlePan}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseReset}
        onMouseLeave={handleMouseReset}
      >
        <Page src={src} ref={pageRef} draggable={false} />
      </PageContainer>
    </DocumentContainer>
  )
}

export default View
