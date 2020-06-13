import {
  ZOOM_IN,
  ZOOM_OUT,
  ZOOM_RESET,
  GO_TO_PAGE,
  SET_MAX_PAGE,
  SET_PAGES,
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

export const setPages = (pages: string[]): PagesAction => {
  return {
    type: SET_PAGES,
    pages,
  }
}

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
