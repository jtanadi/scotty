import React, { ReactElement } from "react"
import { Link } from "react-router-dom"

import {
  ButtonsContainer,
  NavBarContainer,
  NavButton,
  PageInfo,
  NameContainer,
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
  handleChangePage(option: PageOption): void
  handleZoom(scaleOffset: number): void
}

const NavBar: React.FC<PropTypes> = ({
  pageNum,
  maxPage,
  filename,
  handleChangePage,
  handleZoom,
}): ReactElement => {
  return (
    <NavBarContainer>
      <NameContainer>{filename}</NameContainer>
      <ButtonsContainer>
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
        <NavButton onClick={(): void => handleZoom(-1)}>{"-"}</NavButton>
        <NavButton onClick={(): void => handleZoom(1)}>{"+"}</NavButton>
      </ButtonsContainer>
      <ButtonsContainer>
        <Link to="/">
          <CloseButton>Close</CloseButton>
        </Link>
      </ButtonsContainer>
    </NavBarContainer>
  )
}

export default NavBar
