import styled from "styled-components"
import { ButtonRound, COLORS } from "../../globalStyles"
import {
  animationDuration,
  buttonExpand,
  textAppear,
  buttonReset,
  textReset,
} from "./keyframes"

type UploadProps = {
  reset: boolean
}

export const UploadButton = styled(ButtonRound)<UploadProps>`
  color: ${COLORS.WHITE};
  animation: ${(props): any => (props.reset ? buttonReset : buttonExpand)}
    ${animationDuration} ease-in-out forwards;
  background-color: ${COLORS.SPACE_GRAY};
  border: 4px solid ${COLORS.WHITE};

  &:hover {
    background-color: ${COLORS.SPACE_GRAY};
    box-shadow: 0 0 0.5rem ${COLORS.WHITE};
  }

  &:active {
    color: ${COLORS.MID_GRAY};
    border-color: ${COLORS.MID_GRAY};
    background-color: ${COLORS.SPACE_GRAY};
  }

  &:disabled {
    color: ${COLORS.DARK_GRAY};
    background-color: ${COLORS.MID_GRAY};
  }
`

export const UploadButtonText = styled.span<UploadProps>`
  animation: ${(props): any => (props.reset ? textReset : textAppear)}
    ${animationDuration} ease-in-out forwards;
  opacity: 0;
`
