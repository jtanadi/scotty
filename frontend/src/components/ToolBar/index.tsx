import React, { useState, FC, ReactElement } from "react"
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

const ToolBar: FC<StateProps & DispatchProps> = ({
  toolColor,
  numOfTools,
  selectedToolIdx,
  selectTool,
}): ReactElement => {
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
      <ColorIndicator color={toolColor} onClick={handlePalette} />
      <Palette show={showPalette} handleShow={handlePalette} />
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
  toolColor: string
}

const mapStateToProps = ({ tools }): StateProps => ({
  numOfTools: tools.length,
  selectedToolIdx: tools.selectedIdx,
  toolColor: tools.color,
})

type DispatchProps = {
  selectTool(idx: number): void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  selectTool(idx): void {
    dispatch(selectTool(idx))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
