import styled from "styled-components"

export const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
`

export const ButtonOK = styled.button`
  font-family: sans-serif;
  border: 0;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #67e678;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background-color: #54c463;
  }

  &:active {
    background-color: #40a84e;
  }

  &:disabled {
    color: gray;
    background-color: lightgray;
    cursor: not-allowed;
  }
`

export const ButtonNotOK = styled(ButtonOK)`
  background-color: #ff6347;
  color: white;

  &:hover {
    background-color: #d64a31;
  }

  &:active {
    background-color: #b53721;
  }
`

export const H1 = styled.h1`
  font-family: sans-serif;
`

export const H2 = styled.h2`
  font-family: sans-serif;
`

export const H3 = styled.h3`
  font-family: sans-serif;
`

export const P = styled.p`
  font-family: sans-serif;
`

export const Code = styled.span`
  font-family: monospace;
  background-color: #dedede;
`
