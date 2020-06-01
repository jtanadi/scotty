import styled from "styled-components"

import { H2, P, Button, ToolButton, Input, COLORS } from "../globalStyles"

export const InputContainer = styled.div`
  width: 100%;
  margin: 1.25rem 0.5rem 1.75rem 0;
  position: relative;
  height: 2rem;
`

export const LinkInput = styled(Input)`
  width: calc(100% - 2.25rem - 0.5rem);
  height: 2.25rem;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  position: absolute;
  top: 0;
  left: 0;
`

export const CopyButton = styled(ToolButton)`
  box-sizing: border-box;
  border: 1px solid ${COLORS.MID_GRAY};
  position: absolute;
  top: 0;
  right: 0;
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
