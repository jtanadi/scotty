import React, { useState, FC, ReactElement } from "react"

import {
  ButtonsContainer,
  ButtonsInnerContainer,
  ToolBarButton,
  ColorIndicator,
} from "./styles"

type PropTypes = {
  pointerColor: string
  showMouse: boolean
  handleToolBarButton(tool: TOOLS): void
}

export enum TOOLS {
  POINTER = "pointer",
  DRAW = "draw",
  ERASE = "erase",
  COMMENT = "comment",
}

const ToolBar: FC<PropTypes> = ({
  pointerColor,
  handleToolBarButton,
}): ReactElement => {
  const [activeTool, setActiveTool] = useState("")
  const handleClick = (ev): void => {
    if (activeTool === ev.target.id) {
      setActiveTool("")
    } else {
      setActiveTool(ev.target.id)
    }

    handleToolBarButton(ev.target.id)
  }

  return (
    <ButtonsContainer>
      <ColorIndicator color={pointerColor} />
      <ButtonsInnerContainer>
        <ToolBarButton
          id={TOOLS.POINTER}
          width="2.25rem"
          height="2.25rem"
          image="/static/icons/pointer.svg"
          imageHover="/static/icons/pointerLight.svg"
          imageActive="/static/icons/pointerLight.svg"
          onClick={handleClick}
          active={activeTool === TOOLS.POINTER}
        />
      </ButtonsInnerContainer>
    </ButtonsContainer>
  )
}

export default ToolBar
