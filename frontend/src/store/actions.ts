import { ZOOM_IN, ZOOM_OUT, ZOOM_RESET } from "./constants"

export type ZoomAction = {
  type: string
  scale: number
}

export const zoomIn = (scale: number): ZoomAction => {
  return {
    type: ZOOM_IN,
    scale: scale,
  }
}

export const zoomOut = (scale: number): ZoomAction => {
  return {
    type: ZOOM_OUT,
    scale: scale,
  }
}

export const zoomReset = (): ZoomAction => {
  return {
    type: ZOOM_RESET,
    scale: 0,
  }
}
