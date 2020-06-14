import { combineReducers } from "redux"

import {
  SET_ZOOM_LEVEL,
  GO_TO_PAGE,
  SET_PAGES,
  SELECT_TOOL,
  SET_TOOL_COLOR,
} from "./constants"
import { ZoomAction, PagesAction, ToolAction } from "./actions"
import tools, { Tool } from "../utils/tools"

const zoomReducer = (state = 1, action: ZoomAction): number => {
  switch (action.type) {
    case SET_ZOOM_LEVEL:
      return action.zoomLevel
    default:
      return state
  }
}

export type PageState = {
  currentPage: number
  pages: string[]
}

const initialPageState: PageState = {
  currentPage: 1,
  pages: [],
}

const pagesReducer = (
  state = initialPageState,
  action: PagesAction
): PageState => {
  switch (action.type) {
    case SET_PAGES:
      return { ...state, pages: action.pages }
    case GO_TO_PAGE:
      return { ...state, currentPage: action.pageNum }
    default:
      return state
  }
}

export type ToolState = {
  tools: Tool[]
  selectedIdx: number
  color: string
}

const initialToolState: ToolState = {
  tools,
  selectedIdx: null,
  color: "",
}

const toolReducer = (
  state = initialToolState,
  action: ToolAction
): ToolState => {
  switch (action.type) {
    case SELECT_TOOL:
      return { ...state, selectedIdx: action.idx }
    case SET_TOOL_COLOR:
      return { ...state, color: action.color }
    default:
      return state
  }
}

export default combineReducers({
  zoom: zoomReducer,
  pages: pagesReducer,
  tools: toolReducer,
})
