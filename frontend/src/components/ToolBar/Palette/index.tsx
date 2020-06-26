import React, {
  useState,
  useEffect,
  FC,
  ReactElement,
  ChangeEvent,
  MouseEvent,
} from "react"
import { useSelector, useDispatch } from "react-redux"

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
import { setToolColor } from "../../../store/actions"
import { RootState } from "../../../store/types"

type PropTypes = {
  show: boolean
  handleShow(): void
}

const createColors = (firstColor: string): string[] => [
  firstColor,
  "#F2994A",
  "#F2C94C",
  "#219653",
  "#6FCF97",
  "#2F80ED",
  "#2D9CDB",
]

const Palette: FC<PropTypes> = ({ show, handleShow }): ReactElement => {
  const toolColor = useSelector((state: RootState) => state.tools.color)
  const dispatch = useDispatch()
  const [colors, setColors] = useState([])
  const [presetColorUsed, setPresetColorUsed] = useState(true)
  useEffect(() => {
    if (!toolColor) return
    if (colors.length) {
      const usingPresetColor = !!colors.find(color => color === toolColor)
      setPresetColorUsed(usingPresetColor)
    } else {
      setColors(createColors(toolColor))
    }
  }, [toolColor])

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    // Basic validation: only accept up to 6 characters
    // valid hex values (a-f, 0-9)
    const hex = ev.target.value
    const hexRegex = /^[a-f0-9]+$/gi
    if (hex.length > 6 || (hex && !hexRegex.test(hex))) return

    setToolColor(`#${hex}`)
  }

  const handleColorClick = (ev: MouseEvent): void => {
    const target = ev.target as HTMLDivElement
    dispatch(setToolColor(target.id))
  }

  const renderPalette = (): ReactElement => {
    return (
      <>
        <Container>
          <InnerContainer>
            {colors.map((color, i) => (
              <Color
                id={color}
                key={`color-${i}`}
                color={color}
                selected={color === toolColor}
                onClick={handleColorClick}
              />
            ))}
            <InputDiv>
              <HashDiv>
                <Hash>#</Hash>
              </HashDiv>
              <ColorInput
                value={toolColor.replace(/^#/, "").toLowerCase()}
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
