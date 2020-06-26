import React, {
  FC,
  ReactElement,
  RefObject,
  useRef,
  useState,
  useEffect,
} from "react"
import { useSelector, useDispatch } from "react-redux"

import { DocumentContainer, PageContainer, Page } from "./styles"
import usePanhandler from "./hooks/usePanhandler"
import { cachePage, setScrollRatios } from "../../store/actions"
import { RootState } from "../../store/types"

type PropTypes = {
  pageRef: RefObject<HTMLImageElement>
  socketUpdateScroll(left: number, top: number): void
}

const View: FC<PropTypes> = ({ pageRef, socketUpdateScroll }): ReactElement => {
  const docRef = useRef(null)
  const dispatch = useDispatch()
  const zoomLevel = useSelector((state: RootState) => state.zoom.zoomLevel)
  const pdfUrl = useSelector((state: RootState) => state.room.pdfUrl)
  const pageUrl = useSelector(
    (state: RootState) =>
      `${state.room.pdfUrl}/${state.pages.pages[state.pages.currentPage - 1]}`
  )
  const cachedPages = useSelector((state: RootState) => state.pages.cached)

  const nextPageFile = useSelector(
    (state: RootState) =>
      state.pages.pages[state.pages.currentPage + state.pages.currentPage - 1]
  )
  const nextNextPageFile = useSelector(
    (state: RootState) =>
      state.pages.pages[state.pages.currentPage + state.pages.currentPage]
  )

  const presenterMode = useSelector(
    (state: RootState) => !!state.room.presenterID
  )
  const isPresenter = useSelector(
    (state: RootState) => state.room.userID === state.room.presenterID
  )

  const {
    mouseDown,
    handleContextMenu,
    handleMouseDown,
    handleMouseReset,
    handlePan,
  } = usePanhandler(docRef, socketUpdateScroll)

  useEffect(() => {
    // Load next 2 pages to be loaded if not cached yet
    // on p1 -> load 2, 3
    // on p2 -> load 4, 5
    // on p3 -> load 6, 7, etc.

    if (nextPageFile && !cachedPages[nextPageFile]) {
      const nextPage = new Image()
      nextPage.src = `${pdfUrl}/${nextPageFile}`
      dispatch(cachePage(nextPageFile))
    }

    if (nextNextPageFile && !cachedPages[nextNextPageFile]) {
      const nextNextPage = new Image()
      nextNextPage.src = `${pdfUrl}/${nextNextPageFile}`
      dispatch(cachePage(nextNextPageFile))
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

  const handleScroll = (ev): void => {
    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
      scrollTop,
      scrollHeight,
      clientHeight,
    } = ev.target

    const scrollLeftMax = scrollWidth - clientWidth
    const scrollTopMax = scrollHeight - clientHeight

    // Default to 0.5 (center)
    const left = scrollLeftMax ? scrollLeft / scrollLeftMax : 0.5
    const top = scrollTopMax ? scrollTop / scrollTopMax : 0.5

    dispatch(setScrollRatios(left, top))
    if (presenterMode && isPresenter) {
      socketUpdateScroll(left, top)
    }
  }

  return (
    <DocumentContainer
      ref={docRef}
      showScrollbars={showScrollbars}
      onScroll={handleScroll}
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

export default View
