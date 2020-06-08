import React, { useState, useEffect, FC, ReactElement, MouseEvent } from "react"

import Palette from "./Palette"
import {
  ButtonsContainer,
  ButtonsInnerContainer,
  ToolBarButton,
  ColorIndicator,
} from "./styles"

type PropTypes = {
  pointerColor: string
  showMouse: boolean
  handleToolBarButton(tool: TOOLS | string): void
  handleChangeColor(color: string): void
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
  handleChangeColor,
}): ReactElement => {
  const [paletteColors, setPaletteColors] = useState([])
  useEffect(() => {
    if (!pointerColor || paletteColors.length) return

    setPaletteColors([
      pointerColor,
      "#F2994A",
      "#F2C94C",
      "#219653",
      "#6FCF97",
      "#2F80ED",
      "#2D9CDB",
    ])
  }, [pointerColor])

  const [activeTool, setActiveTool] = useState("")
  const handleClick = (ev: MouseEvent): void => {
    const target = ev.target as HTMLElement

    if (activeTool === target.id) {
      setActiveTool("")
    } else {
      setActiveTool(target.id)
    }

    handleToolBarButton(target.id)
  }

  const [showPalette, setShowPalette] = useState(false)
  const handlePalette = (): void => {
    setShowPalette(prev => !prev)
  }

  return (
    <ButtonsContainer>
      <ColorIndicator color={pointerColor} onClick={handlePalette} />
      <Palette
        show={showPalette}
        colors={paletteColors}
        currentColor={pointerColor}
        handleShow={handlePalette}
        handleChangeColor={handleChangeColor}
      />
      <ButtonsInnerContainer count={1}>
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
