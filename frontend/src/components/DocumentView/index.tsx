import React, { FC, ReactElement, RefObject, useRef } from "react"
import { connect } from "react-redux"

import { DocumentContainer, PageContainer, Page } from "./styles"

import usePanhandler from "./hooks/usePanhandler"

type PropTypes = {
  pdfUrl: string
  pageRef: RefObject<HTMLImageElement>
}

const View: FC<PropTypes & StateProps> = ({
  pdfUrl,
  pageRef,
  zoom,
  pageUrl,
}): ReactElement => {
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
        <Page src={`${pdfUrl}/${pageUrl}`} ref={pageRef} draggable={false} />
      </PageContainer>
    </DocumentContainer>
  )
}

type StateProps = {
  zoom: number
  pageUrl: string
}

const mapStateToProps = ({ zoom, pages }): StateProps => ({
  zoom,
  pageUrl: pages.pages[pages.currentPage - 1],
})

export default connect(mapStateToProps)(View)
