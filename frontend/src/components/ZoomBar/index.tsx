import React, { FC, ReactElement } from "react"

import { ToolButton } from "../globalStyles"
import { ButtonsContainer } from "./styles"

const ZoomBar: FC<{}> = (): ReactElement => {
  return (
    <ButtonsContainer>
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomIn.svg"
        imageHover="/static/icons/zoomInLight.svg"
        imageActive="/static/icons/zoomInLight.svg"
      />
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/zoomOut.svg"
        imageHover="/static/icons/zoomOutLight.svg"
        imageActive="/static/icons/zoomOutLight.svg"
      />
    </ButtonsContainer>
  )
}

export default ZoomBar
