import store from "./index"
import {
  SET_ZOOM_LEVEL,
  GO_TO_PAGE,
  SET_PAGES,
  SELECT_TOOL,
  SET_TOOL_COLOR,
} from "./constants"

/////////////////////
//      Zooms      //
/////////////////////

export type ZoomAction = {
  type: string
  zoomLevel?: number
}

enum ZOOM_LIMIT {
  MIN = 1,
  MAX = 5,
}

export const zoomIn = (offset = 1): ZoomAction => {
  const currentZoom = store.getState().zoom
  if (currentZoom < ZOOM_LIMIT.MAX) {
    return {
      type: SET_ZOOM_LEVEL,
      zoomLevel: currentZoom + offset,
    }
  }

  // "Do nothing"
  return { type: "" }
}

export const zoomOut = (offset = 1): ZoomAction => {
  const currentZoom = store.getState().zoom
  if (currentZoom > ZOOM_LIMIT.MIN) {
    return {
      type: SET_ZOOM_LEVEL,
      zoomLevel: currentZoom - offset,
    }
  }

  // "Do nothing"
  return { type: "" }
}

export const zoomReset = (): ZoomAction => ({
  type: SET_ZOOM_LEVEL,
  zoomLevel: ZOOM_LIMIT.MIN,
})

/////////////////////
//      Pages      //
/////////////////////

export type PagesAction = {
  type: string
  maxPage?: number
  pageNum?: number
  pages?: string[]
}

export const setPages = (pages: string[]): PagesAction => ({
  type: SET_PAGES,
  pages,
})

export const goToPage = (pageNum: number): PagesAction => ({
  type: GO_TO_PAGE,
  pageNum,
})

/////////////////////
//      Tools      //
/////////////////////

export type ToolAction = {
  type: string
  idx?: number
  color?: string
}

export const selectTool = (idx: number): ToolAction => ({
  type: SELECT_TOOL,
  idx,
})

export const setToolColor = (hex: string): ToolAction => ({
  type: SET_TOOL_COLOR,
  color: hex,
})
