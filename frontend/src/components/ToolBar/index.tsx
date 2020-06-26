import React, { useState, FC, ReactElement } from "react"
import { useSelector, useDispatch } from "react-redux"

import Palette from "./Palette"
import {
  ButtonsContainer,
  ButtonsInnerContainer,
  ToolBarButton,
  ColorIndicator,
} from "./styles"
import * as actions from "../../store/actions"
import { RootState } from "../../store/types"

type PropTypes = {
  socketUpdatePresenter: () => void
  socketUpdateZoom: (zoomLevel: number) => void
  socketUpdateScroll: (scrollLeft: number, scrollTop: number) => void
}

const ToolBar: FC<PropTypes> = ({
  socketUpdatePresenter,
  socketUpdateZoom,
  socketUpdateScroll,
}): ReactElement => {
  const userID = useSelector((state: RootState) => state.room.userID)
  const presenterMode = useSelector(
    (state: RootState) => !!state.room.presenterID
  )
  const isPresenter = useSelector(
    (state: RootState) => state.room.userID === state.room.presenterID
  )
  const tools = useSelector((state: RootState) => state.tools.tools)
  const selectedToolIdx = useSelector(
    (state: RootState) => state.tools.selectedIdx
  )
  const toolColor = useSelector((state: RootState) => state.tools.color)
  const zoomLevel = useSelector((state: RootState) => state.zoom.zoomLevel)
  const scrollLeftRatio = useSelector(
    (state: RootState) => state.zoom.scrollLeftRatio
  )
  const scrollTopRatio = useSelector(
    (state: RootState) => state.zoom.scrollTopRatio
  )

  const dispatch = useDispatch()
  const [showPalette, setShowPalette] = useState(false)
  const handlePalette = (): void => {
    setShowPalette(prev => !prev)
  }

  const handleToolClick = (clickedIdx: number): void => {
    // Last tool is presenter tool
    // setPresenter can work like a toggle on the socket server side
    if (clickedIdx === tools.length - 1) {
      dispatch(actions.setPresenter(userID))
      socketUpdatePresenter()
      socketUpdateZoom(zoomLevel)
      socketUpdateScroll(scrollLeftRatio, scrollTopRatio)
    } else {
      const toolIdx = selectedToolIdx === clickedIdx ? null : clickedIdx
      dispatch(actions.selectTool(toolIdx))
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

export default ToolBar
