import React, { FC, ReactElement, RefObject, useRef } from "react"
import { connect } from "react-redux"

import { DocumentContainer, PageContainer, Page } from "./styles"

import usePanhandler from "./hooks/usePanhandler"

type PropTypes = {
  src: string
  pageRef: RefObject<HTMLImageElement>
}

type Store = {
  zoom: number
}

const View: FC<PropTypes & Store> = ({ src, pageRef, zoom }): ReactElement => {
  const docRef = useRef(null)
  const {
    mouseDown,
    handleContextMenu,
    handleMouseDown,
    handleMouseReset,
    handlePan,
  } = usePanhandler(docRef, zoom)

  return (
    <DocumentContainer ref={docRef}>
      <PageContainer
        scale={zoom}
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

const mapStateToProps = ({ zoom }): Store => ({ zoom })

export default connect(mapStateToProps)(View)
