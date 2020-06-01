import { keyframes } from "styled-components"

export const buttonExpand = keyframes`
  0% {
    width: 4rem;
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
`

export const textReset = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
`
