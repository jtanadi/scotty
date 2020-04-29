import React, { FC, ReactElement, RefObject, useRef } from "react"

import { DocumentContainer, PageContainer, Page } from "./styles"

import usePanhandler from "./hooks/usePanhandler"

type PropTypes = {
  src: string
  scale: number
  pageRef: RefObject<HTMLImageElement>
}

const View: FC<PropTypes> = ({ src, scale, pageRef }): ReactElement => {
  const docRef = useRef(null)
  const {
    mouseDown,
    handleContextMenu,
    handleMouseDown,
    handleMouseReset,
    handlePan,
  } = usePanhandler(docRef, scale)

  return (
    <DocumentContainer ref={docRef}>
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
