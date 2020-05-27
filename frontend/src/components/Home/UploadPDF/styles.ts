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
  color: white;
  animation: ${(props): any => (props.reset ? buttonReset : buttonExpand)}
    ${animationDuration} ease-in-out forwards;
  background-color: ${COLORS.GREEN};

  &:hover {
    background-color: ${COLORS.MID_GREEN};
  }

  &:active {
    background-color: ${COLORS.DARK_GREEN};
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
