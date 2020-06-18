import store from "./index"
import * as constants from "./constants"
import { RoomAction, ZoomAction, PagesAction, ToolAction } from "./types"
import { User } from "../../../backend/src/sockets/types"

/////////////////////
//      Room       //
/////////////////////

export const setUsers = (users: User[]): RoomAction => ({
  type: constants.SET_USERS,
  users,
})

export const setPdfUrl = (url: string): RoomAction => ({
  type: constants.SET_PDF_URL,
  url,
})

export const clearRoom = (): RoomAction => ({
  type: constants.CLEAR_ROOM,
})

/////////////////////
//      Zooms      //
/////////////////////

enum ZOOM_LIMIT {
  MIN = 1,
  MAX = 5,
}

export const zoomIn = (offset = 1): ZoomAction => {
  const currentZoom = store.getState().zoom
  if (currentZoom < ZOOM_LIMIT.MAX) {
    return {
      type: constants.SET_ZOOM_LEVEL,
      zoomLevel: currentZoom + offset,
    }
  }

  // Default: do nothing
  return { type: "" }
}

export const zoomOut = (offset = 1): ZoomAction => {
  const currentZoom = store.getState().zoom
  if (currentZoom > ZOOM_LIMIT.MIN) {
    return {
      type: constants.SET_ZOOM_LEVEL,
      zoomLevel: currentZoom - offset,
    }
  }

  // Default: do nothing
  return { type: "" }
}

export const zoomReset = (): ZoomAction => ({
  type: constants.SET_ZOOM_LEVEL,
  zoomLevel: ZOOM_LIMIT.MIN,
})

/////////////////////
//      Pages      //
/////////////////////

export const setPages = (pages: string[]): PagesAction => ({
  type: constants.SET_PAGES,
  pages,
})

export const goToPage = (pageNum: number): PagesAction => ({
  type: constants.GO_TO_PAGE,
  pageNum,
})

export const clearPages = (): PagesAction => ({
  type: constants.CLEAR_PAGES,
})

export const cachePage = (page: string): PagesAction => ({
  type: constants.CACHE_PAGE,
  page,
})

/////////////////////
//      Tools      //
/////////////////////

export const selectTool = (idx: number): ToolAction => ({
  type: constants.SELECT_TOOL,
  idx,
})

export const setToolColor = (hex: string): ToolAction => ({
  type: constants.SET_TOOL_COLOR,
  color: hex,
})
