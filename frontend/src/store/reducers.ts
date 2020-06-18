import { combineReducers } from "redux"

import * as constants from "./constants"
import * as types from "./types"
import tools from "../utils/tools"

const initialRoomState: types.RoomState = {
  users: [],
  userID: "",
  pdfUrl: "",
  filename: "",
  presenterID: "",
}
const roomReducer = (
  state = initialRoomState,
  action: types.RoomAction
): types.RoomState => {
  switch (action.type) {
    case constants.SET_USERS:
      return { ...state, users: action.users }
    case constants.SET_USER_ID:
      return { ...state, userID: action.id }
    case constants.SET_PDF_URL:
      return { ...state, pdfUrl: action.url }
    case constants.CLEAR_ROOM:
      return initialRoomState
    case constants.SET_FILENAME:
      return { ...state, filename: action.filename }
    case constants.SET_PRESENTER:
      return { ...state, presenterID: action.presenterID }
    default:
      return state
  }
}

const zoomReducer = (state = 1, action: types.ZoomAction): number => {
  switch (action.type) {
    case constants.SET_ZOOM_LEVEL:
      return action.zoomLevel
    default:
      return state
  }
}

const initialPageState: types.PageState = {
  currentPage: 1,
  pages: [],
  cached: {},
}

const pagesReducer = (
  state = initialPageState,
  action: types.PagesAction
): types.PageState => {
  switch (action.type) {
    case constants.SET_PAGES:
      return { ...state, pages: action.pages }
    case constants.GO_TO_PAGE:
      return { ...state, currentPage: action.pageNum }
    case constants.CLEAR_PAGES:
      return initialPageState
    case constants.CACHE_PAGE:
      return { ...state, cached: { ...state.cached, [action.page]: true } }
    default:
      return state
  }
}

const initialToolState: types.ToolState = {
  tools,
  selectedIdx: null,
  color: "",
}

const toolReducer = (
  state = initialToolState,
  action: types.ToolAction
): types.ToolState => {
  switch (action.type) {
    case constants.SELECT_TOOL:
      return { ...state, selectedIdx: action.idx }
    case constants.SET_TOOL_COLOR:
      return { ...state, color: action.color }
    default:
      return state
  }
}

export default combineReducers({
  room: roomReducer,
  zoom: zoomReducer,
  pages: pagesReducer,
  tools: toolReducer,
})
