import React, {
  useState,
  useEffect,
  FC,
  ReactElement,
  ChangeEvent,
} from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

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

const Palette: FC<PropTypes & StateProps & DispatchProps> = ({
  show,
  handleShow,
  toolColor,
  setToolColor,
}): ReactElement => {
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

  const renderPalette = (): ReactElement => {
    return (
      <>
        <Container>
          <InnerContainer>
            {colors.map((color, i) => (
              <Color
                key={`color-${i}`}
                color={color}
                selected={color === toolColor}
                onClick={(): void => setToolColor(color)}
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

type StateProps = {
  toolColor: string
}
const mapStateToProps = ({ tools }): StateProps => ({
  toolColor: tools.color,
})

type DispatchProps = {
  setToolColor(hex: string): void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setToolColor(hex): void {
    dispatch(setToolColor(hex))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Palette)
