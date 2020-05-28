import React, { ReactElement } from "react"

import { User } from "../../../../backend/src/sockets/types"

import {
  ButtonsContainer,
  NavBarContainer,
  NavButton,
  PointerButton,
  PageInfo,
  Filename,
  InfoContainer,
  CloseButton,
} from "./styles"

export type PageOption = {
  offset?: number
  goto?: number
}

type PropTypes = {
  pageNum: number
  maxPage: number
  filename: string
  users: User[]
  showMouse: boolean
  pointerColor: string
  handleChangePage(option: PageOption): void
  handleZoom(scaleOffset: number): void
  handleClose(): void
  handlePointerToggle(): void
}

const NavBar: React.FC<PropTypes> = ({
  pageNum,
  maxPage,
  filename,
  users,
  showMouse,
  pointerColor,
  handleChangePage,
  handleClose,
  handlePointerToggle,
  handleZoom,
}): ReactElement => {
  return (
    <NavBarContainer>
      <InfoContainer>
        <Filename>{filename}</Filename>
        {` - ${users.length} ${users.length > 1 ? "users" : "user"}`}
      </InfoContainer>
      <ButtonsContainer>
        <NavButton onClick={(): void => handleZoom(-1)}>{"-"}</NavButton>
        <NavButton onClick={(): void => handleZoom(1)}>{"+"}</NavButton>
        <NavButton onClick={(): void => handleChangePage({ goto: 1 })}>
          {"<<"}
        </NavButton>
        <NavButton onClick={(): void => handleChangePage({ offset: -1 })}>
          {"<"}
        </NavButton>
        <PageInfo>
          Page {pageNum} / {maxPage}
        </PageInfo>
        <NavButton onClick={(): void => handleChangePage({ offset: 1 })}>
          {">"}
        </NavButton>
        <NavButton onClick={(): void => handleChangePage({ goto: maxPage })}>
          {">>"}
        </NavButton>
        <PointerButton
          showMouse={showMouse}
          color={pointerColor}
          onClick={handlePointerToggle}
        >
          🏹️
        </PointerButton>
      </ButtonsContainer>
      <InfoContainer>
        <CloseButton onClick={handleClose}>Close</CloseButton>
      </InfoContainer>
    </NavBarContainer>
  )
}

export default NavBar