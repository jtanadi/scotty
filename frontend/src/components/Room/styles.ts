import styled from "styled-components"

const RoomContainer = styled.div``

const NavBar = styled.div`
  width: 100%;
  height: 3rem;
  background-color: white;
  display: flex;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 99;
`

const ButtonsContainer = styled.div`
  margin: auto;
`

const NavButton = styled.button`
  border: 0;
  background-color: lightgray;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin: 0 0.25rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: darkgray;
  }

  &:active {
    color: white;
    background-color: gray;
  }
`

const PageInfo = styled.span`
  margin: 0 0.5rem;
  font-family: sans-serif;
  font-weight: bold;
`

export { RoomContainer, ButtonsContainer, NavBar, NavButton, PageInfo }
