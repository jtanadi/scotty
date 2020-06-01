import styled from "styled-components"

import { VerticalButtonsContainer, ToolButton } from "../globalStyles"
export const ButtonsContainer = styled(VerticalButtonsContainer)`
  right: 2rem;
  box-shadow: none;
`

export const ButtonsInnerContainer = styled.div`
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
`

type PointerButtonProps = {
  color: string
  showMouse: boolean
}

export const PointerButton = styled(ToolButton).attrs(
  (props: PointerButtonProps) => {
    if (props.showMouse) {
      return { style: { backgroundColor: props.color } }
    }
  }
)<PointerButtonProps>``

export const ColorIndicator = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 2.25rem;
  background-color: ${(props): string => props.color};
  margin-bottom: 0.875rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
`
