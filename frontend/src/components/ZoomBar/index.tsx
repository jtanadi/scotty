import React, { FC, ReactElement } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"

import { ToolButton } from "../globalStyles"
import { ButtonsContainer } from "./styles"

import { zoomIn, zoomOut } from "../../store/actions"

type DispatchProps = {
  zoomIn(scale: number): void
  zoomOut(scale: number): void
}

const ZoomBar: FC<{} & DispatchProps> = ({ zoomIn, zoomOut }): ReactElement => {
  return (
    <ButtonsContainer>
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomIn.svg"
        imageHover="/static/icons/zoomInLight.svg"
        imageActive="/static/icons/zoomInLight.svg"
        onClick={(): void => zoomIn(1)}
      />
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomOut.svg"
        imageHover="/static/icons/zoomOutLight.svg"
        imageActive="/static/icons/zoomOutLight.svg"
        onClick={(): void => zoomOut(1)}
      />
    </ButtonsContainer>
  )
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  zoomIn(scale: number): void {
    dispatch(zoomIn(scale))
  },
  zoomOut(scale: number): void {
    dispatch(zoomOut(scale))
  },
})

export default connect(null, mapDispatchToProps)(ZoomBar)
