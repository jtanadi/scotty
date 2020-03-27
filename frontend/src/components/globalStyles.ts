import styled from "styled-components"

export const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
`

export const Cover = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
`

export const Button = styled.button`
  border: 0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0 auto;
  cursor: pointer;
  background-color: lightgray;
  font-family: sans-serif;

  &:hover {
    background-color: darkgray;
  }

  &:active {
    color: white;
    background-color: gray;
  }

  &:disabled {
    color: gray;
    background-color: lightgray;
    cursor: not-allowed;
  }
`

export const ButtonOK = styled(Button)`
  background-color: #67e678;

  &:hover {
    background-color: #54c463;
  }

  &:active {
    color: black;
    background-color: #40a84e;
  }
`

export const ButtonNotOK = styled(Button)`
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
