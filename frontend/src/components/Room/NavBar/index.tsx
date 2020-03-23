import React, { ReactElement } from "react"

import {
  ButtonsContainer,
  NavBarContainer,
  NavButton,
  PageInfo,
} from "./styles"

export type PageOption = {
  offset?: number
  goto?: number
}

type PropTypes = {
  pageNum: number
  maxPage: number
  handleChangePage(option: PageOption): void
}

const NavBar: React.FC<PropTypes> = ({
  pageNum,
  maxPage,
  handleChangePage,
}): ReactElement => {
  return (
    <NavBarContainer>
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
    </NavBarContainer>
  )
}

export default NavBar
