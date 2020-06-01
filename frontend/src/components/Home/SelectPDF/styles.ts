import styled from "styled-components"
import { COLORS, ANIMATION_DURATION } from "../../globalStyles"

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
    border: 4px solid ${COLORS.MID_GRAY};
  }
`

export const Label = styled.label`
  box-sizing: border-box;
  margin: auto;
  background-color: ${COLORS.SPACE_GRAY};
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
  transition: box-shadow ${ANIMATION_DURATION} ease;
  border: 4px solid ${COLORS.WHITE};

  &:hover {
    box-shadow: 0 0 0.5rem ${COLORS.WHITE};
  }
`

export const Icon = styled.div`
  width: 3rem;
  height: 3rem;
  margin-top: 1px;
  background-image: url(/static/icons/folder.svg);
  background-repeat: no-repeat;
  background-position: center;

  &:active {
    background-image: url(/static/icons/folderDark.svg);
  }
`

export const IconWrapper = styled.div`
  margin: auto;
`
