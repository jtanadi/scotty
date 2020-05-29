import styled from "styled-components"

import { H2, P, Button, COLORS, ANIMATION_DURATION } from "../globalStyles"

export const InputContainer = styled.div`
  width: 100%;
  margin: 1.25rem 0.5rem 1.75rem 0;
  position: relative;
  height: 2rem;
`

export const Input = styled.input`
  box-sizing: border-box;
  width: calc(100% - 2.25rem - 0.5rem);
  height: 2.25rem;
  margin-right: 0.5rem;
  font-family: sans-serif;
  font-size: 0.85rem;
  position: absolute;
  top: 0;
  left: 0;

  &:focus {
    border: 2px solid ${COLORS.MID_GRAY};
  }
`

export const CopyButton = styled.button`
  box-sizing: border-box;
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  background-color: ${COLORS.LIGHT_GRAY};
  border: 1px solid ${COLORS.MID_GRAY};
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  background: url(/static/icons/copyPasteboard.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  bacground-position: center;
  transition: all ${ANIMATION_DURATION} ease-in-out;

  &:hover {
    background-color: ${COLORS.MID_GRAY};
  }

  &:active {
    background-color: ${COLORS.DARK_GRAY};
    background-image: url(/static/icons/copyPasteboardLight.svg);
  }
`

export const OKButton = styled(Button)`
  width: 100%;
`

export const Title = styled(H2)`
  margin: 0;
  text-align: center;
`

export const Body = styled(P)`
  margin: 1.125rem 0 0 0;
`
