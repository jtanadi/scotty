import { keyframes } from "styled-components"
import { COLORS } from "../../globalStyles"

export const animationDuration = "0.25s"

export const buttonExpand = keyframes`
  0% {
    width: 4rem;
    border-color: ${COLORS.MUSTARD};
  }

  50% {
    border-color: ${COLORS.WHITE};
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
    border-color: ${COLORS.WHITE};
  }
  
  100% {
    border-color: ${COLORS.MUSTARD};
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
