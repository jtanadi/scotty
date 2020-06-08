import styled, { css } from "styled-components"

import { VerticalButtonsContainer, ToolButton, COLORS } from "../globalStyles"
export const ButtonsContainer = styled(VerticalButtonsContainer)`
  right: 2rem;
  box-shadow: none;
`

type InnerContainerProps = {
  count: number
}

export const ButtonsInnerContainer = styled.div<InnerContainerProps>`
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  height: ${(props): string => `${props.count * 2.25}rem`};
`

type ToolBarButtonProps = {
  active: boolean
}

export const ToolBarButton = styled(ToolButton)<ToolBarButtonProps>`
  ${(props): any =>
    props.active &&
    css`
      background-color: ${COLORS.SPACE_GRAY};
      background-image: url(${props.imageHover});

      &:hover {
        background-color: ${COLORS.SPACE_GRAY};
      }
    `}
`
export const ColorIndicator = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 2.25rem;
  background-color: ${(props): string => props.color};
  margin-bottom: 0.875rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
`