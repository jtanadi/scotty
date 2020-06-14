import React, { FC, ReactElement } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"

import { ToolButton } from "../globalStyles"
import { ButtonsContainer } from "./styles"

import { zoomIn, zoomOut } from "../../store/actions"

const ZoomBar: FC<{} & DispatchProps> = ({ zoomIn, zoomOut }): ReactElement => {
  return (
    <ButtonsContainer>
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomIn.svg"
        imageHover="/static/icons/zoomInLight.svg"
        imageActive="/static/icons/zoomInLight.svg"
        onClick={(): void => zoomIn()}
      />
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomOut.svg"
        imageHover="/static/icons/zoomOutLight.svg"
        imageActive="/static/icons/zoomOutLight.svg"
        onClick={(): void => zoomOut()}
      />
    </ButtonsContainer>
  )
}

type DispatchProps = {
  zoomIn(offset?: number): void
  zoomOut(offset?: number): void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  zoomIn(offset): void {
    dispatch(zoomIn(offset))
  },
  zoomOut(offset): void {
    dispatch(zoomOut(offset))
  },
})

export default connect(null, mapDispatchToProps)(ZoomBar)
