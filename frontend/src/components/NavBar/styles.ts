import styled, { css } from "styled-components"
import { ToolButton, H4, Input, COLORS } from "../globalStyles"

export const NavBarContainer = styled.div`
  width: 100%;
  height: 3rem;
  background-color: ${COLORS.LIGHT_GRAY};
  display: flex;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 1000;
`

type NavChildProps = {
  flex?: string
}

export const NavChild = styled.div<NavChildProps>`
  display: flex;

  ${(props): any =>
    props.flex &&
    css`
      flex: ${props.flex};
    `}
`

export const InfoText = styled(H4)`
  margin: auto;
  display: inline-block;
`

export const PageNumContainer = styled.div`
  margin: auto 0.5rem;
  min-width: 90px;
  max-width: 120px;
`

export const PageNumForm = styled.form`
  display: inline;
`

export const PageNumInput = styled(Input)`
  box-sizing: border-box;
  width: 48%;
  font-weight: 600;
  text-align: right;
  margin-right: 4%;
`

export const MaxPageNum = styled(InfoText)`
  font-weight: 400;
`

export const ReverseToolButton = styled(ToolButton)`
  transform: rotate(180deg);
`

export const CloseButton = styled(ToolButton)`
  &:hover:enabled {
    background-color: ${COLORS.RED};
  }

  &:active:enabled {
    background-color: ${COLORS.MID_RED};
  }
`
