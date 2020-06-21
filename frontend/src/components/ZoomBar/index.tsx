import React, { FC, ReactElement, MouseEvent } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"

import { ToolButton } from "../globalStyles"
import { ButtonsContainer } from "./styles"

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
    if (target.id === "zoom-in" && zoomLevel < ZOOM_LIMIT.MAX) {
      setZoomLevel(zoomLevel + 1, broadcast)
    } else if (target.id === "zoom-out" && zoomLevel > ZOOM_LIMIT.MIN) {
      setZoomLevel(zoomLevel - 1, broadcast)
    }
  }

  return (
    <ButtonsContainer>
      <ToolButton
        disabled={presenterMode && !isPresenter}
        id="zoom-in"
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomIn.svg"
        imageHover="/static/icons/zoomInLight.svg"
        imageActive="/static/icons/zoomInLight.svg"
        onClick={handleClick}
      />
      <ToolButton
        disabled={presenterMode && !isPresenter}
        id="zoom-out"
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomOut.svg"
        imageHover="/static/icons/zoomOutLight.svg"
        imageActive="/static/icons/zoomOutLight.svg"
        onClick={handleClick}
      />
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
