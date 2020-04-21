import styled from "styled-components"
import { Button, ButtonNotOK } from "../../globalStyles"

const NavBarContainer = styled.div`
  width: 100%;
  height: 3rem;
  background-color: white;
  display: flex;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 99;
`

const InfoContainer = styled.div`
  font-family: sans-serif;
  margin: auto;
  flex: 1;
  text-align: center;
`

const Filename = styled.span`
  font-weight: bold;
`

const ButtonsContainer = styled.div`
  margin: auto;
`

const NavButton = styled(Button)`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  font-weight: bold;
`

type PointerButtonProp = {
  color: string
  showMouse: boolean
}

const PointerButton = styled(NavButton).attrs((p: PointerButtonProp) => {
  if (p.showMouse) {
    return { style: { backgroundColor: p.color } }
  }
})<PointerButtonProp>``

const CloseButton = styled(ButtonNotOK)`
  font-weight: bold;
  padding: 0.5rem 1rem;
`

const PageInfo = styled.span`
  margin: 0 0.5rem;
  font-family: sans-serif;
  font-weight: bold;
`

export {
  ButtonsContainer,
  InfoContainer,
  Filename,
  NavBarContainer,
  NavButton,
  PointerButton,
  CloseButton,
  PageInfo,
}
