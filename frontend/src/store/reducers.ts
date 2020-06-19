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

const initialZoomState: types.ZoomState = {
  zoomLevel: 1,
  scrollTopRatio: 0.5,
  scrollLeftRatio: 0.5,
}

const zoomReducer = (
  state = initialZoomState,
  action: types.ZoomAction
): types.ZoomState => {
  switch (action.type) {
    case constants.SET_ZOOM_LEVEL:
      return { ...state, zoomLevel: action.zoomLevel }
    case constants.SET_SCROLL_RATIOS:
      return {
        ...state,
        scrollLeftRatio: action.left,
        scrollTopRatio: action.top,
      }
    case constants.NO_OP_ZOOM:
      return state
    case constants.CLEAR_ZOOM:
      return initialZoomState
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
    case constants.CLEAR_TOOLS:
      return initialToolState
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
