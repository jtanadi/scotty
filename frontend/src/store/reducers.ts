import { combineReducers } from "redux"

import {
  ZOOM_IN,
  ZOOM_OUT,
  ZOOM_RESET,
  GO_TO_PAGE,
  SET_PAGES,
} from "./constants"
import { ZoomAction, PagesAction } from "./actions"

enum ZOOM_LIMIT {
  MIN = 1,
  MAX = 5,
}

const zoomReducer = (state = 1, action: ZoomAction): number => {
  switch (action.type) {
    case ZOOM_IN:
      if (state + action.scale <= ZOOM_LIMIT.MAX) {
        return state + action.scale
      } else {
        return state
      }
    case ZOOM_OUT:
      if (state - action.scale >= ZOOM_LIMIT.MIN) {
        return state - action.scale
      } else {
        return state
      }
    case ZOOM_RESET:
      return action.scale
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

export default combineReducers({
  zoom: zoomReducer,
  pages: pagesReducer,
})
