import styled from "styled-components"

import { H3, Code, Button, COLORS } from "../globalStyles"

export const Filename = styled(H3)`
  margin: 0;
  text-align: center;
`

export const ErrorButton = styled(Button)`
  background-color: ${COLORS.RED};
  flex: 1;

  &:hover {
    background-color: ${COLORS.MID_RED};
    box-shadow: 0 0 0.5rem ${COLORS.MID_RED};
  }

  &:active {
    background-color: ${COLORS.DARK_RED};
    box-shadow: 0 0 0.5rem ${COLORS.DARK_RED};
  }
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
`

export const Message = styled(Code)`
  text-align: center;
  margin: 0;
`

export const ErrorMessage = styled(Code)`
  color: ${COLORS.RED};
  text-align: center;
  margin: 2.75rem auto;
  font-weight: 500;
`
export const LoadingIcon = styled.img`
  width: 4rem;
  height: 4rem;
  display: block;
  margin: 2rem auto;
`
