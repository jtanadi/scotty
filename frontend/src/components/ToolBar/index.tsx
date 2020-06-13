import React, { useState, useEffect, FC, ReactElement } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import Palette from "./Palette"
import {
  ButtonsContainer,
  ButtonsInnerContainer,
  ToolBarButton,
  ColorIndicator,
} from "./styles"
import tools from "../../utils/tools"
import { selectTool } from "../../store/actions"

type PropTypes = {
  pointerColor: string
  showMouse: boolean
  handlePointerColor(color: string): void
}

export enum TOOL {
  POINTER = "pointer",
  DRAW = "draw",
  ERASE = "erase",
  COMMENT = "comment",
}

const ToolBar: FC<PropTypes & StateProps & DispatchProps> = ({
  pointerColor,
  handlePointerColor,
  numOfTools,
  selectedToolIdx,
  selectTool,
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

  const [showPalette, setShowPalette] = useState(false)
  const handlePalette = (): void => {
    setShowPalette(prev => !prev)
  }

  const handleToolClick = (clickedIdx: number): void => {
    const toolIdx = selectedToolIdx === clickedIdx ? null : clickedIdx
    selectTool(toolIdx)
  }

  return (
    <ButtonsContainer>
      <ColorIndicator color={pointerColor} onClick={handlePalette} />
      <Palette
        show={showPalette}
        colors={paletteColors}
        currentColor={pointerColor}
        handleShow={handlePalette}
        handleChangeColor={handlePointerColor}
      />
      <ButtonsInnerContainer count={numOfTools}>
        {tools.map((tool, i) => (
          <ToolBarButton
            key={`tool-${i}`}
            width="2.25rem"
            height="2.25rem"
            image={tool.image}
            imageHover={tool.hover || tool.image}
            imageActive={tool.active || tool.hover || tool.image}
            onClick={(): void => handleToolClick(i)}
            active={selectedToolIdx === i}
          />
        ))}
      </ButtonsInnerContainer>
    </ButtonsContainer>
  )
}

type StateProps = {
  numOfTools: number
  selectedToolIdx: number
}

const mapStateToProps = ({ tools }): StateProps => ({
  numOfTools: tools.length,
  selectedToolIdx: tools.selectedIdx,
})

type DispatchProps = {
  selectTool(idx: number): void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  selectTool(idx: number): void {
    dispatch(selectTool(idx))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
