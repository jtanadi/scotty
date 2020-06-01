import React, { useState, useEffect, ReactElement, FormEvent } from "react"

import { User } from "../../../../backend/src/sockets/types"

import { ToolButton } from "../globalStyles"
import {
  NavBarContainer,
  NavChild,
  InfoText,
  PageNumContainer,
  PageNumForm,
  PageNumInput,
  MaxPageNum,
  ReverseToolButton,
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
  handleChangePage(option: PageOption): void
  handleClose(): void
}

const NavBar: React.FC<PropTypes> = ({
  pageNum,
  maxPage,
  filename,
  users,
  handleChangePage,
  handleClose,
}): ReactElement => {
  const [currentPageNum, setCurrentPageNum] = useState(pageNum || "")

  const handleInputSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    if (!currentPageNum) return
    handleChangePage({ goto: currentPageNum as number })
  }

  const handleInputChange = (ev: FormEvent<HTMLInputElement>): void => {
    if (!ev.currentTarget.value) {
      setCurrentPageNum("")
      return
    }

    const parsedPageNum = parseInt(ev.currentTarget.value, 10)
    if (
      !isNaN(parsedPageNum) &&
      parsedPageNum > 0 &&
      parsedPageNum <= maxPage
    ) {
      setCurrentPageNum(parsedPageNum)
    }
  }

  useEffect(() => {
    setCurrentPageNum(pageNum)
  }, [pageNum])

  return (
    <NavBarContainer>
      <NavChild flex="1">
        <InfoText>{filename}</InfoText>
      </NavChild>

      <NavChild>
        <ToolButton
          width="3rem"
          height="3rem"
          image="/static/icons/firstLastPage.svg"
          imageHover="/static/icons/firstLastPageLight.svg"
          imageActive="/static/icons/firstLastPageLight.svg"
          onClick={(): void => handleChangePage({ goto: 1 })}
        />
        <ToolButton
          width="3rem"
          height="3rem"
          image="/static/icons/prevNextPage.svg"
          imageHover="/static/icons/prevNextPageLight.svg"
          imageActive="/static/icons/prevNextPageLight.svg"
          onClick={(): void => handleChangePage({ offset: -1 })}
        />

        <PageNumContainer>
          <PageNumForm onSubmit={handleInputSubmit}>
            <PageNumInput
              value={currentPageNum}
              onSubmit={handleInputSubmit}
              onChange={handleInputChange}
            />
          </PageNumForm>
          <MaxPageNum>/ {maxPage}</MaxPageNum>
        </PageNumContainer>

        <ReverseToolButton
          width="3rem"
          height="3rem"
          image="/static/icons/prevNextPage.svg"
          imageHover="/static/icons/prevNextPageLight.svg"
          imageActive="/static/icons/prevNextPageLight.svg"
          onClick={(): void => handleChangePage({ offset: 1 })}
        />
        <ReverseToolButton
          width="3rem"
          height="3rem"
          image="/static/icons/firstLastPage.svg"
          imageHover="/static/icons/firstLastPageLight.svg"
          imageActive="/static/icons/firstLastPageLight.svg"
          onClick={(): void => handleChangePage({ goto: maxPage })}
        />
      </NavChild>

      <NavChild flex="1">
        <InfoText>
          {`${users.length} ${users.length > 1 ? "users" : "user"}`}
        </InfoText>
        <CloseButton
          width="3rem"
          height="3rem"
          image="/static/icons/close.svg"
          imageHover="/static/icons/closeLight.svg"
          imageActive="/static/icons/closeLight.svg"
          onClick={handleClose}
        />
      </NavChild>
    </NavBarContainer>
  )
}

export default NavBar
