import { combineReducers } from "redux"
import { ZOOM_IN, ZOOM_OUT, ZOOM_RESET } from "./constants"

import { ZoomAction } from "./actions"

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

export default combineReducers({
  zoom: zoomReducer,
})
