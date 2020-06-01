import styled from "styled-components"
import { ButtonRound, COLORS, ANIMATION_DURATION } from "../../globalStyles"
import { buttonExpand, textAppear, buttonReset, textReset } from "./keyframes"

type UploadProps = {
  reset: boolean
}

export const UploadButton = styled(ButtonRound)<UploadProps>`
  animation: ${(props): any => (props.reset ? buttonReset : buttonExpand)}
    ${ANIMATION_DURATION} ease-in-out forwards;
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
    border: 0;
    color: ${COLORS.DARK_GRAY};
    background-color: ${COLORS.MID_GRAY};
  }
`

export const UploadButtonText = styled.span<UploadProps>`
  animation: ${(props): any => (props.reset ? textReset : textAppear)}
    ${ANIMATION_DURATION} ease-in-out forwards;
  opacity: 0;
`
