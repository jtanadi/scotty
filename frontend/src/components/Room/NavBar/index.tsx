import React, { ReactElement } from "react"
import { Link } from "react-router-dom"

import {
  ButtonsContainer,
  NavBarContainer,
  NavButton,
  PageInfo,
  NameContainer,
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
}

const NavBar: React.FC<PropTypes> = ({
  pageNum,
  maxPage,
  filename,
  handleChangePage,
}): ReactElement => {
  return (
    <NavBarContainer>
      <NameContainer>{filename}</NameContainer>
      <ButtonsContainer>
        <NavButton onClick={(): void => handleChangePage({ goto: 1 })}>
          {`<<`}
        </NavButton>
        <NavButton onClick={(): void => handleChangePage({ offset: -1 })}>
          {`<`}
        </NavButton>
        <PageInfo>
          Page {pageNum} / {maxPage}
        </PageInfo>
        <NavButton onClick={(): void => handleChangePage({ offset: 1 })}>
          {`>`}
        </NavButton>
        <NavButton onClick={(): void => handleChangePage({ goto: maxPage })}>
          {`>>`}
        </NavButton>
      </ButtonsContainer>
      <ButtonsContainer>
        <Link to="/">
          <NavButton>Close</NavButton>
        </Link>
      </ButtonsContainer>
    </NavBarContainer>
  )
}

export default NavBar
