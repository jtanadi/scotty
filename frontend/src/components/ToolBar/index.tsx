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
import * as actions from "../../store/actions"
import { Tool } from "../../utils/tools"

type PropTypes = {
  socketUpdatePresenter: () => void
  socketUpdateZoom: (zoomLevel: number) => void
  socketUpdateScroll: (scrollLeft: number, scrollTop: number) => void
}

const ToolBar: FC<PropTypes & StateProps & DispatchProps> = ({
  userID,
  presenterMode,
  isPresenter,
  tools,
  toolColor,
  selectedToolIdx,
  selectTool,
  setPresenter,
  zoomLevel,
  scrollLeftRatio,
  scrollTopRatio,
}): ReactElement => {
  const [showPalette, setShowPalette] = useState(false)
  const handlePalette = (): void => {
    setShowPalette(prev => !prev)
  }

  const handleToolClick = (clickedIdx: number): void => {
    // Last tool is presenter tool
    // setPresenter can work like a toggle on the socket server side
    if (clickedIdx === tools.length - 1) {
      setPresenter(userID, zoomLevel, scrollLeftRatio, scrollTopRatio)
    } else {
      const toolIdx = selectedToolIdx === clickedIdx ? null : clickedIdx
      selectTool(toolIdx)
    }
  }

  return (
    <ButtonsContainer>
      <ColorIndicator color={toolColor} onClick={handlePalette} />
      <Palette show={showPalette} handleShow={handlePalette} />
      <ButtonsInnerContainer count={tools.length}>
        {tools.map((tool, i) => (
          <ToolBarButton
            key={`tool-${i}`}
            width="2.25rem"
            height="2.25rem"
            image={tool.image}
            imageHover={tool.hover || tool.image}
            imageActive={tool.active || tool.hover || tool.image}
            onClick={(): void => handleToolClick(i)}
            active={
              selectedToolIdx === i || (i === tools.length - 1 && isPresenter)
            }
            disabled={i === tools.length - 1 && presenterMode && !isPresenter}
          />
        ))}
      </ButtonsInnerContainer>
    </ButtonsContainer>
  )
}

type StateProps = {
  tools: Tool[]
  selectedToolIdx: number
  toolColor: string
  userID: string
  presenterMode: boolean
  isPresenter: boolean
  zoomLevel: number
  scrollLeftRatio: number
  scrollTopRatio: number
}

const mapStateToProps = ({
  room: { userID, presenterID },
  tools: { tools, selectedIdx, color },
  zoom: { zoomLevel, scrollLeftRatio, scrollTopRatio },
}): StateProps => ({
  tools,
  selectedToolIdx: selectedIdx,
  toolColor: color,
  userID,
  presenterMode: !!presenterID,
  isPresenter: presenterID === userID,
  zoomLevel,
  scrollLeftRatio,
  scrollTopRatio,
})

type DispatchProps = {
  selectTool(idx: number): void
  setPresenter(
    id: string,
    zoomLevel: number,
    scrollLeftRatio: number,
    scrollTopRatio: number
  ): void
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { socketUpdatePresenter, socketUpdateZoom, socketUpdateScroll }
): DispatchProps => ({
  selectTool(idx): void {
    dispatch(actions.selectTool(idx))
  },
  setPresenter(id, zoomLevel, scrollLeftRatio, scrollTopRatio): void {
    dispatch(actions.setPresenter(id))
    socketUpdatePresenter()
    socketUpdateZoom(zoomLevel)
    socketUpdateScroll(scrollLeftRatio, scrollTopRatio)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
