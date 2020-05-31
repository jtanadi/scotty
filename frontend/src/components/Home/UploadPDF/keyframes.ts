import { keyframes } from "styled-components"
import { COLORS } from "../../globalStyles"

export const buttonExpand = keyframes`
  0% {
    width: 4rem;
    border-color: ${COLORS.MUSTARD};
  }

  50% {
    border-color: ${COLORS.WHITE};
  }

  100% {
    width: 22.5%;
    min-width: 225px;
    max-width: 325px;
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
    width: 22.5%;
    min-width: 225px;
    max-width: 325px;
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
