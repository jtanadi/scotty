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

const NameContainer = styled.div`
  font-family: sans-serif;
  margin: auto;
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
  NameContainer,
  NavBarContainer,
  NavButton,
  CloseButton,
  PageInfo,
}
