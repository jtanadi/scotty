import styled from "styled-components"

import { COLORS } from "../globalStyles"

export const Form = styled.form`
  width: 25%;
  min-width: 250px;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
`

type ResetTextProps = {
  show: boolean
}

export const ResetText = styled.p<ResetTextProps>`
  opacity: ${(props): number => (props.show ? 1 : 0)};
  text-align: center;
  color: ${COLORS.DARK_GRAY};
  cursor: ${(props): string => (props.show ? "pointer" : "auto")};
  text-decoration: underline;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`
