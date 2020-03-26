import styled from "styled-components"

import { H2, H3, P, ButtonOK } from "../globalStyles"

export const Island = styled.div`
  width: 40%;
  min-width: 500px;
  margin: auto;
  padding: 1.5rem 2.5rem 0.85rem 2.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
`

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 2rem;
  margin: 0.5rem 0;
  font-family: sans-serif;
  font-size: 0.85rem;

  &:focus {
    border: 2px solid #56aab8;
  }
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem 0 1.5rem 0;
`
export const OKButton = styled(ButtonOK)`
  flex: 1;
`

export const HR = styled.hr`
  margin: 2rem 0 1rem 0;
  border: 1px solid lightgray;
`

export const Title = styled(H2)`
  margin: 0;
`

export const Subtitle = styled(H3)`
  margin: 0;
`

export const Body = styled(P)`
  margin-top: 0.5rem;
`

export const QuoteAttr = styled.span`
  font-size: 0.75rem;
  font-weight: normal;
`
