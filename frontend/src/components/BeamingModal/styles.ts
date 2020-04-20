import styled from "styled-components"

import { H2, P, ButtonNotOK } from "../globalStyles"

export const Title = styled(H2)`
  margin: 0;
  text-align: center;
`

export const ErrorButton = styled(ButtonNotOK)`
  flex: 1;
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem 0 1.5rem 0;
`

export const Body = styled(P)`
  margin: 2rem 0;
  text-align: center;
`

export const ErrorMessage = styled(Body)`
  color: red;
`
