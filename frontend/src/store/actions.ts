import {
  ZOOM_IN,
  ZOOM_OUT,
  ZOOM_RESET,
  GO_TO_PAGE,
  SET_MAX_PAGE,
} from "./constants"

/////////////////////
//      Types      //
/////////////////////

export type ZoomAction = {
  type: string
  scale?: number
}

export type PagesAction = {
  type: string
  maxPage?: number
  pageNum?: number
}

/////////////////////
// Action creators //
/////////////////////

// Zooms

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

// Page navigation

export const goToPage = (pageNum: number): PagesAction => {
  return {
    type: GO_TO_PAGE,
    pageNum,
  }
}

export const setMaxPage = (maxPage: number): PagesAction => ({
  type: SET_MAX_PAGE,
  maxPage,
})
