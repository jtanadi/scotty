import styled from "styled-components"
import { COLORS } from "../../globalStyles"

// Effectively hiding input
export const Input = styled.input`
  width: 0.01px;
  height: 0.01px;
  opacity: 0;
  position: absolute;
  z-index: -999;

  &:focus + label {
    outline: 1px dotted black;
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:active + label {
    background-color: ${COLORS.DARK_MUSTARD};
  }
`

export const Label = styled.label`
  margin: auto;
  background-color: ${COLORS.MUSTARD};
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  text-align: center;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;

  &:hover {
    background-color: ${COLORS.MID_MUSTARD};
  }

  &:active {
    background-color: ${COLORS.DARK_MUSTARD};
  }
`

export const Icon = styled.svg`
  margin-left: -3px;
  margin-top: 3px;
`

export const IconWrapper = styled.div`
  margin: auto;
`
