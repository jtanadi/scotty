import React, {
  FC,
  ReactElement,
  RefObject,
  useRef,
  useState,
  useEffect,
} from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { DocumentContainer, PageContainer, Page } from "./styles"
import usePanhandler from "./hooks/usePanhandler"
import { cachePage, setScrollRatios } from "../../store/actions"
import { PageCache } from "../../store/types"
import handleScroll from "./handleScroll"

type PropTypes = {
  pageRef: RefObject<HTMLImageElement>
  socketUpdateScroll(left: number, top: number): void
}

const View: FC<PropTypes & StateProps & DispatchProps> = ({
  pageRef,
  zoomLevel,
  pdfUrl,
  pageUrl,
  nextPageFile,
  nextNextPageFile,
  cachedPages,
  cachePage,
  presenterMode,
  isPresenter,
  scrollLeftRatio,
  scrollTopRatio,
  setScrollRatios,
}): ReactElement => {
  const docRef = useRef(null)
  const {
    mouseDown,
    handleContextMenu,
    handleMouseDown,
    handleMouseReset,
    handlePan,
  } = usePanhandler(
    docRef,
    zoomLevel,
    presenterMode,
    isPresenter,
    scrollLeftRatio,
    scrollTopRatio,
    setScrollRatios
  )

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

  const [showScrollbars, setShowScrollbars] = useState(true)
  useEffect(() => {
    // Show scrollbars only if not in presenter mode
    // OR if in presenter mode and is presenter
    // AND zoom level is more than 1
    if ((!presenterMode || (presenterMode && isPresenter)) && zoomLevel > 1) {
      setShowScrollbars(true)
    } else {
      setShowScrollbars(false)
    }
  }, [zoomLevel, presenterMode, isPresenter])

  const _handleScroll = (ev): void => {
    handleScroll(ev.target, presenterMode && isPresenter, setScrollRatios)
  }

  return (
    <DocumentContainer
      ref={docRef}
      showScrollbars={showScrollbars}
      onScroll={_handleScroll}
    >
      <PageContainer
        disablePan={presenterMode && !isPresenter}
        scale={zoomLevel}
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
  zoomLevel: number
  scrollLeftRatio: number
  scrollTopRatio: number
  pageUrl: string
  nextPageFile: string
  nextNextPageFile: string
  pdfUrl: string
  cachedPages: PageCache
  presenterMode: boolean
  isPresenter: boolean
}

const mapStateToProps = ({
  zoom: { zoomLevel, scrollLeftRatio, scrollTopRatio },
  pages: { pages, currentPage, cached },
  room: { pdfUrl, presenterID, userID },
}): StateProps => ({
  zoomLevel,
  scrollLeftRatio,
  scrollTopRatio,
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
  setScrollRatios(left: number, top: number, broadcast: boolean): void
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { socketUpdateScroll }
): DispatchProps => ({
  cachePage(page): void {
    dispatch(cachePage(page))
  },
  setScrollRatios(left, top, broadcast): void {
    dispatch(setScrollRatios(left, top))
    if (broadcast) {
      socketUpdateScroll(left, top)
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(View)
