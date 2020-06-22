import React, { FC, ReactElement, MouseEvent } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"

import { ToolButton } from "../globalStyles"
import { ButtonsContainer } from "./styles"

import { zoomTools } from "../../utils/tools"
import { setZoomLevel } from "../../store/actions"

enum ZOOM_LIMIT {
  MIN = 1,
  MAX = 5,
}

type PropTypes = {
  socketUpdateZoom(zoom: number): void
}

const ZoomBar: FC<PropTypes & StateProps & DispatchProps> = ({
  zoomLevel,
  presenterMode,
  isPresenter,
  setZoomLevel,
}): ReactElement => {
  const handleClick = (ev: MouseEvent): void => {
    const target = ev.target as HTMLButtonElement
    const broadcast = presenterMode && isPresenter
    if (target.id === "zoomIn" && zoomLevel < ZOOM_LIMIT.MAX) {
      setZoomLevel(zoomLevel + 1, broadcast)
    } else if (target.id === "zoomOut" && zoomLevel > ZOOM_LIMIT.MIN) {
      setZoomLevel(zoomLevel - 1, broadcast)
    } else if (target.id === "zoomReset") {
      setZoomLevel(1, broadcast)
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

type StateProps = {
  zoomLevel: number
  presenterMode: boolean
  isPresenter: boolean
}

const mapStateToProps = ({
  room: { userID, presenterID },
  zoom: { zoomLevel },
}): StateProps => ({
  zoomLevel,
  presenterMode: !!presenterID,
  isPresenter: presenterID === userID,
})

type DispatchProps = {
  setZoomLevel: (zoomLevel: number, broadcast: boolean) => void
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { socketUpdateZoom }
): DispatchProps => ({
  setZoomLevel(zoomLevel, broadcast): void {
    dispatch(setZoomLevel(zoomLevel))
    if (broadcast) {
      socketUpdateZoom(zoomLevel)
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ZoomBar)
