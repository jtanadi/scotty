import * as constants from "./constants"
import { Tool } from "../utils/tools"
import { User } from "../../../backend/src/sockets/types"

//////////////////
// ACTION TYPES //
//////////////////

type SetUsersAction = {
  type: typeof constants.SET_USERS
  users: User[]
}

type SetUserIdAction = {
  type: typeof constants.SET_USER_ID
  id: string
}

type SetPdfUrlAction = {
  type: typeof constants.SET_PDF_URL
  url: string
}

type ClearRoomAction = {
  type: typeof constants.CLEAR_ROOM
}

type SetFilenameAction = {
  type: typeof constants.SET_FILENAME
  filename: string
}

type SetPresenterAction = {
  type: typeof constants.SET_PRESENTER
  presenterID: string
}

export type RoomAction =
  | SetUsersAction
  | SetUserIdAction
  | SetPdfUrlAction
  | ClearRoomAction
  | SetFilenameAction
  | SetPresenterAction

type SetZoomAction = {
  type: typeof constants.SET_ZOOM_LEVEL | string
  zoomLevel?: number
}

export type ZoomAction = SetZoomAction

type GoToPageAction = {
  type: typeof constants.GO_TO_PAGE
  pageNum: number
}

type SetPagesAction = {
  type: typeof constants.SET_PAGES
  pages: string[]
}

type ClearPagesAction = {
  type: typeof constants.CLEAR_PAGES
}

type CachePageAction = {
  type: typeof constants.CACHE_PAGE
  page: string
}

export type PagesAction =
  | GoToPageAction
  | SetPagesAction
  | ClearPagesAction
  | CachePageAction

type SelectToolAction = {
  type: typeof constants.SELECT_TOOL
  idx: number
}

type SetColorAction = {
  type: typeof constants.SET_TOOL_COLOR
  color: string
}

export type ToolAction = SelectToolAction | SetColorAction

/////////////////
// STATE TYPES //
/////////////////

export type RoomState = {
  users: User[]
  userID: string
  pdfUrl: string
  filename: string
  presenterID: string
}

export type PageCache = {
  [pageFile: string]: boolean
}

export type PageState = {
  currentPage: number
  pages: string[]
  cached: PageCache
}

export type ToolState = {
  tools: Tool[]
  selectedIdx: number
  color: string
}
