import styled from "styled-components"

export enum COLORS {
  GREEN = "#308613",
  MID_GREEN = "#226112",
  DARK_GREEN = "#164709",
  MUSTARD = "#D6AC2D",
  MID_MUSTARD = "#97781A",
  DARK_MUSTARD = "#674F05",
  RED = "#C73B28",
  MID_RED = "#972819",
  DARK_RED = "#7E2613",
  LIGHT_GRAY = "#F2F2F2",
  MID_GRAY = "#DEDEDE",
  DARK_GRAY = "#6E6E6E",
  DOCUMENT_VIEW_BG = "#CBCBCB",
  WHITE = "#ffffff",
  BLACK = "#000000",
}

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

export const ModalCover = styled(Cover)`
  z-index: 9998;
`

export const Island = styled.div`
  width: 40%;
  min-width: 500px;
  margin: auto;
  padding: 1.5rem 2.5rem 0.85rem 2.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
`

export const Button = styled.button`
  border: 0;
  border-radius: 0.5rem;
  margin: 0 auto;
  background-color: ${COLORS.LIGHT_GRAY};
  font-family: sans-serif;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.MID_GRAY};
  }

  &:active {
    color: white;
    background-color: ${COLORS.DARK_GRAY};
  }

  &:disabled {
    color: ${COLORS.LIGHT_GRAY};
    background-color: ${COLORS.MID_GRAY};
    cursor: not-allowed;
  }
`

export const ButtonRound = styled(Button)`
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
`

export const ButtonSelectFile = styled(ButtonRound)`
  color: white;
  background-color: ${COLORS.MUSTARD};

  &:hover {
    background-color: ${COLORS.MID_MUSTARD};
  }

  &:active {
    background-color: ${COLORS.DARK_MUSTARD};
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

  &:disabled {
    color: gray;
    background-color: lightgray;
    cursor: not-allowed;
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
  font-size: 1.875rem;
  font-family: sans-serif;
  font-weight: bold;
`

export const H3 = styled.h3`
  font-size: 1.1875rem;
  font-weight: bold;
  font-family: sans-serif;
`

export const P = styled.p`
  font-family: sans-serif;
`

export const Code = styled.span`
  font-family: monospace;
  background-color: #dedede;
`
