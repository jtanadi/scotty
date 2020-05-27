import { keyframes } from "styled-components"
import { COLORS } from "../../globalStyles"

export const animationDuration = "0.25s"

export const buttonExpand = keyframes`
  0% {
    width: 4rem;
    background-color: ${COLORS.MUSTARD};
  }

  50% {
    background-color: ${COLORS.GREEN};
  }

  100% {
    width: 100%;
  }
`

export const textAppear = keyframes`
  0%{
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const buttonReset = keyframes`
  0% {
    width: 100%;
  }

  50% {
    background-color: ${COLORS.GREEN}
  }
  
  100% {
    background-color: ${COLORS.MUSTARD}
  }
`

export const textReset = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
`
