import styled, { css } from "styled-components"

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
  MID_GRAY = "#C7C7C7",
  DARK_GRAY = "#6E6E6E",
  SPACE_GRAY = "#14161B",
  DOCUMENT_VIEW_BG = "#CBCBCB",
  WHITE = "#ffffff",
  BLACK = "#000000",
}

export const ANIMATION_DURATION = "0.2s"

type BackgroundProps = {
  color: string
}

export const Background = styled.div<BackgroundProps>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${(props): string => props.color};
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
  width: 20%;
  min-width: 250px;
  max-width: 325px;
  margin: auto;
  padding: 1.5rem 2.5rem 2rem 2.5rem;
  background-color: white;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
`

export const VerticalButtonsContainer = styled.div`
  width: 2.25rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 2rem;
`

export const Button = styled.button`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  border: 0;
  border-radius: 2.5rem;
  margin: 0 auto;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.SPACE_GRAY};
  cursor: pointer;
  height: 2.5rem;
  transition: all ${ANIMATION_DURATION} ease-in-out;

  &:hover {
    box-shadow: 0 0 0.5rem ${COLORS.SPACE_GRAY};
  }

  &:active {
    color: ${COLORS.MID_GRAY};
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

type ToolButtonProps = {
  width: string
  height: string
  image: string
  imageHover?: string
  imageActive?: string
}

export const ToolButton = styled.button<ToolButtonProps>`
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};
  border: 0;
  padding: 0;
  background-color: ${COLORS.LIGHT_GRAY};
  background-image: url(${(props): string => props.image});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  bacground-position: center;
  transition: all ${ANIMATION_DURATION} ease-in-out;

  &:hover {
    background-color: ${COLORS.DARK_GRAY};
  }

  &:active {
    background-color: ${COLORS.SPACE_GRAY};
  }

  ${(props): any =>
    props.imageHover &&
    css`
      &:hover {
        background-image: url(${props.imageHover});
      }
    `}

  ${(props): any =>
    props.imageActive &&
    css`
      &:active {
        background-image: url(${props.imageActive});
      }
    `}
`

export const H1 = styled.h1`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 300;
  font-size: 3rem;
`

export const H2 = styled.h2`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1.875rem;
  font-weight: 600;
`

export const H3 = styled.h3`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1.1875rem;
  font-weight: 400;
`

export const H4 = styled.h4`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
`

export const P = styled.p`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1rem;
  font-weight: 400;
`

export const Code = styled.p`
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.8125rem;
  font-weight: 400;
  text-transform: uppercase;
`

export const Bold = styled.strong`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 600;
`

export const Input = styled.input`
  box-sizing: border-box;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 1rem;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.MID_GRAY};
  padding: 0 0.35rem;

  &:focus {
    border: 2px solid ${COLORS.SPACE_GRAY};
  }
`
