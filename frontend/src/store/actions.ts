import {
  ZOOM_IN,
  ZOOM_OUT,
  ZOOM_RESET,
  GO_TO_PAGE,
  SET_PAGES,
  SELECT_TOOL,
} from "./constants"

/////////////////////
//      Zooms      //
/////////////////////

export type ZoomAction = {
  type: string
  scale?: number
}

export const zoomIn = (scale: number): ZoomAction => ({
  type: ZOOM_IN,
  scale: scale,
})

export const zoomOut = (scale: number): ZoomAction => ({
  type: ZOOM_OUT,
  scale: scale,
})

export const zoomReset = (): ZoomAction => ({
  type: ZOOM_RESET,
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
  idx: number
}

export const selectTool = (idx: number): ToolAction => ({
  type: SELECT_TOOL,
  idx,
})
