import React, { FC, ReactElement, ChangeEvent } from "react"

import {
  Container,
  InnerContainer,
  Triangle,
  Color,
  InputDiv,
  HashDiv,
  Hash,
  ColorInput,
  PaletteCover,
} from "./styles"

type PropTypes = {
  show: boolean
  colors: string[]
  currentColor: string
  handleShow(): void
  handleChangeColor(color: string): void
}

const Palette: FC<PropTypes> = ({
  show,
  colors,
  currentColor,
  handleShow,
  handleChangeColor,
}): ReactElement => {
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    // validate color here

    handleChangeColor(`#${ev.target.value}`)
  }

  const renderPalette = (): ReactElement => {
    return (
      <>
        <Container>
          <InnerContainer>
            {colors.map((color, i) => (
              <Color
                key={`color-${i}`}
                color={color}
                selected={color === currentColor}
                onClick={(): void => handleChangeColor(color)}
              />
            ))}
            <InputDiv>
              <HashDiv>
                <Hash>#</Hash>
              </HashDiv>
              <ColorInput
                value={currentColor.replace("#", "")}
                onChange={handleInputChange}
              />
            </InputDiv>
          </InnerContainer>
          <Triangle />
        </Container>
        <PaletteCover onClick={handleShow} />
      </>
    )
  }

  return show ? renderPalette() : null
}

export default Palette
