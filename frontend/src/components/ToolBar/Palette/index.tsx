import React, {
  useState,
  useEffect,
  FC,
  ReactElement,
  ChangeEvent,
} from "react"

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
  const [presetColorUsed, setPresetColorUsed] = useState(true)
  useEffect(() => {
    const usingPresetColor = !!colors.find(color => color === currentColor)
    setPresetColorUsed(usingPresetColor)
  }, [currentColor])

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    // Basic validation: only accept up to 6 characters
    // and only accept valid hex values (a-f, 0-9)
    const hex = ev.target.value
    const hexRegex = /^[a-f0-9]+$/gi
    if (hex.length > 6 || (hex && !hexRegex.test(hex))) return

    handleChangeColor(`#${hex}`)
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
                value={currentColor.replace(/^#/, "").toLowerCase()}
                onChange={handleInputChange}
                presetColorUsed={presetColorUsed}
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
