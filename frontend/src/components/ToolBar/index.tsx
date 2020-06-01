import React, { FC, ReactElement } from "react"

import {
  ButtonsContainer,
  ButtonsInnerContainer,
  PointerButton,
  ColorIndicator,
} from "./styles"

type PropTypes = {
  pointerColor: string
  showMouse: boolean
  handlePointerToggle(): void
}

const ToolBar: FC<PropTypes> = ({
  pointerColor,
  showMouse,
  handlePointerToggle,
}): ReactElement => {
  return (
    <ButtonsContainer>
      <ColorIndicator color={pointerColor} />
      <ButtonsInnerContainer>
        <PointerButton
          width="2.25rem"
          height="2.25rem"
          image="/static/icons/pointer.svg"
          imageHover="/static/icons/pointerLight.svg"
          imageActive="/static/icons/pointerLight.svg"
          showMouse={showMouse}
          color={pointerColor}
          onClick={handlePointerToggle}
        />
      </ButtonsInnerContainer>
    </ButtonsContainer>
  )
}

export default ToolBar
