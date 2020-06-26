import React, { FC, ReactElement, MouseEvent } from "react"
import { useSelector, useDispatch } from "react-redux"

import { ToolButton } from "../globalStyles"
import { ButtonsContainer } from "./styles"

import { zoomTools } from "../../utils/tools"
import { setZoomLevel } from "../../store/actions"
import { RootState } from "../../store/types"

enum ZOOM_LIMIT {
  MIN = 1,
  MAX = 5,
}

type PropTypes = {
  socketUpdateZoom(zoom: number): void
}

const ZoomBar: FC<PropTypes> = ({ socketUpdateZoom }): ReactElement => {
  const presenterMode = useSelector(
    (state: RootState) => !!state.room.presenterID
  )
  const isPresenter = useSelector(
    (state: RootState) => state.room.userID === state.room.presenterID
  )
  const zoomLevel = useSelector((state: RootState) => state.zoom.zoomLevel)
  const dispatch = useDispatch()

  const handleClick = (ev: MouseEvent): void => {
    const target = ev.target as HTMLButtonElement
    const broadcast = presenterMode && isPresenter
    let newZoomLevel: number

    if (target.id === "zoomIn" && zoomLevel < ZOOM_LIMIT.MAX) {
      newZoomLevel = zoomLevel + 1
    } else if (target.id === "zoomOut" && zoomLevel > ZOOM_LIMIT.MIN) {
      newZoomLevel = zoomLevel - 1
    } else if (target.id === "zoomReset") {
      newZoomLevel = 1
    }

    dispatch(setZoomLevel(newZoomLevel))
    if (broadcast) {
      socketUpdateZoom(newZoomLevel)
    }
  }

  return (
    <ButtonsContainer>
      {zoomTools.map(
        (tool, i): ReactElement => (
          <ToolButton
            key={`zoom-tool-${i}`}
            disabled={presenterMode && !isPresenter}
            id={tool.name}
            width="2.25rem"
            height="2.25rem"
            image={tool.image}
            imageHover={tool.hover || tool.image}
            imageActive={tool.active || tool.hover || tool.image}
            onClick={handleClick}
          />
        )
      )}
    </ButtonsContainer>
  )
}

export default ZoomBar
