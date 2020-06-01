import React, { FC, ReactElement } from "react"

import { ToolButton } from "../globalStyles"
import { ButtonsContainer } from "./styles"

type PropTypes = {
  handleZoom(offset: number): void
}

const ZoomBar: FC<PropTypes> = ({ handleZoom }): ReactElement => {
  return (
    <ButtonsContainer>
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomIn.svg"
        imageHover="/static/icons/zoomInLight.svg"
        imageActive="/static/icons/zoomInLight.svg"
        onClick={(): void => handleZoom(1)}
      />
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomOut.svg"
        imageHover="/static/icons/zoomOutLight.svg"
        imageActive="/static/icons/zoomOutLight.svg"
        onClick={(): void => handleZoom(-1)}
      />
    </ButtonsContainer>
  )
}

export default ZoomBar
