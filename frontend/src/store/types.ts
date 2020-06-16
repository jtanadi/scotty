import * as constants from "./constants"
import { Tool } from "../utils/tools"

//////////////////
// ACTION TYPES //
//////////////////

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

export type PagesAction = GoToPageAction | SetPagesAction

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

export type PageState = {
  currentPage: number
  pages: string[]
}

export type ToolState = {
  tools: Tool[]
  selectedIdx: number
  color: string
}
