import React, { FC, ReactElement } from "react"

import { ToolButton } from "../globalStyles"
import { ButtonsContainer } from "./styles"

const ToolBar: FC<{}> = (): ReactElement => {
  return (
    <ButtonsContainer>
      <ToolButton
        width="2.25rem"
        height="2.25rem"
        image="/static/icons/pointer.svg"
        imageHover="/static/icons/pointerLight.svg"
        imageActive="/static/icons/pointerLight.svg"
      />
    </ButtonsContainer>
  )
}

export default ToolBar
