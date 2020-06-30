import React, { useState, useEffect, ReactElement, FormEvent } from "react"
import { useSelector, useDispatch } from "react-redux"

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
import { goToPage } from "../../store/actions"
import { RootState } from "../../store/types"

type PropTypes = {
  handleClose(): void
  socketChangePage: (pageNum: number) => void
}

const NavBar: React.FC<PropTypes> = ({
  handleClose,
  socketChangePage,
}): ReactElement => {
  const dispatch = useDispatch()

  const [displayPageNum, setDisplayPageNum] = useState("")
  const maxPage = useSelector((state: RootState) => state.pages.pages.length)
  const currentPage = useSelector((state: RootState) => state.pages.currentPage)
  const filename = useSelector((state: RootState) => state.room.filename)
  const numOfUsers = useSelector((state: RootState) => state.room.users.length)
  const inputDisabled = useSelector(
    (state: RootState) =>
      state.room.presenterID && state.room.presenterID !== state.room.userID
  )

  const dispatchPageNum = (pageNum: number): void => {
    dispatch(goToPage(pageNum))
    socketChangePage(pageNum)
  }

  const handleInputSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    if (!displayPageNum || inputDisabled) return

    const pageNum = parseInt(displayPageNum, 10)
    dispatchPageNum(pageNum)
  }

  const handleInputChange = (ev: FormEvent<HTMLInputElement>): void => {
    if (!ev.currentTarget.value) {
      setDisplayPageNum("")
      return
    }

    const parsedPageNum = parseInt(ev.currentTarget.value, 10)
    if (!isNaN(parsedPageNum)) {
      setDisplayPageNum(ev.currentTarget.value)
    }
  }

  const goFirstPage = (): void => {
    dispatchPageNum(1)
  }

  const goLastPage = (): void => {
    dispatchPageNum(maxPage)
  }

  const goPrevPage = (): void => {
    const newPage = currentPage - 1
    if (newPage > 0) {
      dispatchPageNum(newPage)
    }
  }

  const goNextPage = (): void => {
    const newPage = currentPage + 1
    if (newPage <= maxPage) {
      dispatchPageNum(newPage)
    }
  }

  useEffect(() => {
    setDisplayPageNum(currentPage.toString())
  }, [currentPage])

  return (
    <NavBarContainer>
      <NavChild flex="1">
        <InfoText>{filename}</InfoText>
      </NavChild>

      <NavChild>
        <ToolButton
          disabled={inputDisabled}
          width="3rem"
          height="3rem"
          image="/static/icons/firstLastPage.svg"
          imageHover="/static/icons/firstLastPageLight.svg"
          imageActive="/static/icons/firstLastPageLight.svg"
          onClick={goFirstPage}
        />
        <ToolButton
          disabled={inputDisabled}
          width="3rem"
          height="3rem"
          image="/static/icons/prevNextPage.svg"
          imageHover="/static/icons/prevNextPageLight.svg"
          imageActive="/static/icons/prevNextPageLight.svg"
          onClick={goPrevPage}
        />

        <PageNumContainer>
          <PageNumForm onSubmit={handleInputSubmit}>
            <PageNumInput
              disabled={inputDisabled}
              value={displayPageNum}
              onSubmit={handleInputSubmit}
              onChange={handleInputChange}
            />
          </PageNumForm>
          <MaxPageNum>/ {maxPage}</MaxPageNum>
        </PageNumContainer>

        <ReverseToolButton
          disabled={inputDisabled}
          width="3rem"
          height="3rem"
          image="/static/icons/prevNextPage.svg"
          imageHover="/static/icons/prevNextPageLight.svg"
          imageActive="/static/icons/prevNextPageLight.svg"
          onClick={goNextPage}
        />
        <ReverseToolButton
          disabled={inputDisabled}
          width="3rem"
          height="3rem"
          image="/static/icons/firstLastPage.svg"
          imageHover="/static/icons/firstLastPageLight.svg"
          imageActive="/static/icons/firstLastPageLight.svg"
          onClick={goLastPage}
        />
      </NavChild>

      <NavChild flex="1">
        <InfoText>
          {`${numOfUsers} ${numOfUsers > 1 ? "users" : "user"}`}
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
