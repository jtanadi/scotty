import React, { FC, ReactElement, RefObject, useRef, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { DocumentContainer, PageContainer, Page } from "./styles"
import usePanhandler from "./hooks/usePanhandler"
import { cachePage } from "../../store/actions"
import { PageCache } from "../../store/types"

type PropTypes = {
  pageRef: RefObject<HTMLImageElement>
}

const View: FC<PropTypes & StateProps & DispatchProps> = ({
  pageRef,
  zoom,
  pdfUrl,
  pageUrl,
  nextPageFile,
  nextNextPageFile,
  cachedPages,
  cachePage,
  presenterMode,
  isPresenter,
}): ReactElement => {
  const docRef = useRef(null)
  const {
    mouseDown,
    handleContextMenu,
    handleMouseDown,
    handleMouseReset,
    handlePan,
  } = usePanhandler(docRef, zoom, presenterMode, isPresenter)

  useEffect(() => {
    // Load next 2 pages to be loaded if not cached yet
    // on p1 -> load 2, 3
    // on p2 -> load 4, 5
    // on p3 -> load 6, 7, etc.

    if (nextPageFile && !cachedPages[nextPageFile]) {
      const nextPage = new Image()
      nextPage.src = `${pdfUrl}/${nextPageFile}`
      cachePage(nextPageFile)
    }

    if (nextNextPageFile && !cachedPages[nextNextPageFile]) {
      const nextNextPage = new Image()
      nextNextPage.src = `${pdfUrl}/${nextNextPageFile}`
      cachePage(nextNextPageFile)
    }
  }, [pdfUrl, nextPageFile, nextNextPageFile])

  return (
    <DocumentContainer ref={docRef}>
      <PageContainer
        disablePan={presenterMode && !isPresenter}
        scale={zoom}
        mouseDown={mouseDown}
        onContextMenu={handleContextMenu}
        onMouseMove={handlePan}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseReset}
        onMouseLeave={handleMouseReset}
      >
        <Page src={pageUrl} ref={pageRef} draggable={false} />
      </PageContainer>
    </DocumentContainer>
  )
}

type StateProps = {
  zoom: number
  pageUrl: string
  nextPageFile: string
  nextNextPageFile: string
  pdfUrl: string
  cachedPages: PageCache
  presenterMode: boolean
  isPresenter: boolean
}

const mapStateToProps = ({
  zoom: { zoomLevel },
  pages: { pages, currentPage, cached },
  room: { pdfUrl, presenterID, userID },
}): StateProps => ({
  zoom: zoomLevel,
  pdfUrl,
  pageUrl: `${pdfUrl}/${pages[currentPage - 1]}`,
  nextPageFile: pages[currentPage + currentPage - 1],
  nextNextPageFile: pages[currentPage + currentPage],
  cachedPages: cached,
  presenterMode: !!presenterID,
  isPresenter: presenterID === userID,
})

type DispatchProps = {
  cachePage(page: string): void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  cachePage(page): void {
    dispatch(cachePage(page))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(View)
