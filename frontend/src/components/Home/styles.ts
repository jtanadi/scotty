import styled from "styled-components"

import { COLORS, P } from "../globalStyles"

export const Form = styled.form`
  width: 22.5%;
  min-width: 250px;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
`

type ResetTextProps = {
  show: boolean
}

export const ResetText = styled(P)<ResetTextProps>`
  opacity: ${(props): number => (props.show ? 1 : 0)};
  text-align: center;
  color: ${COLORS.MID_GRAY};
  cursor: ${(props): string => (props.show ? "pointer" : "auto")};
  margin-top: 1.5rem;
  text-decoration: underline;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: colors 0.25s ease;

  &:hover {
    color: ${COLORS.WHITE};
  }
`
