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

export const setUserID = (id: string): RoomAction => ({
  type: constants.SET_USER_ID,
  id,
})

export const setPdfUrl = (url: string): RoomAction => ({
  type: constants.SET_PDF_URL,
  url,
})

export const clearRoom = (): RoomAction => ({
  type: constants.CLEAR_ROOM,
})

export const setFilename = (filename: string): RoomAction => ({
  type: constants.SET_FILENAME,
  filename,
})

export const setPresenter = (presenterID: string): RoomAction => ({
  type: constants.SET_PRESENTER,
  presenterID,
})

/////////////////////
//      Zooms      //
/////////////////////

export const setZoomLevel = (zoomLevel: number): ZoomAction => ({
  type: constants.SET_ZOOM_LEVEL,
  zoomLevel,
})

export const setScrollRatios = (left: number, top: number): ZoomAction => ({
  type: constants.SET_SCROLL_RATIOS,
  left,
  top,
})

export const clearZoom = (): ZoomAction => ({
  type: constants.CLEAR_ZOOM,
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

export const clearTools = (): ToolAction => ({
  type: constants.CLEAR_TOOLS,
})
