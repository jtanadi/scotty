import React, { useState, useEffect, ReactElement, FormEvent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import socket from "../../socket"
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
import { PageState } from "../../store/reducers"
import { goToPage } from "../../store/actions"

type PropTypes = {
  filename: string
  roomID: string
  users: User[]
  handleClose(): void
}

type DispatchProps = {
  goToPage(roomID: string, pageNum: number): void
}

const NavBar: React.FC<PropTypes & PageState & DispatchProps> = ({
  roomID,
  currentPage,
  maxPage,
  filename,
  users,
  goToPage,
  handleClose,
}): ReactElement => {
  const [displayPageNum, setDisplayPageNum] = useState("")

  const handleInputSubmit = (ev: FormEvent): void => {
    ev.preventDefault()
    if (!displayPageNum) return
    goToPage(roomID, parseInt(displayPageNum, 10))
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
    goToPage(roomID, 1)
  }

  const goLastPage = (): void => {
    goToPage(roomID, maxPage)
  }

  const goPrevPage = (): void => {
    const newPage = currentPage - 1
    if (currentPage > 0) {
      goToPage(roomID, newPage)
    }
  }

  const goNextPage = (): void => {
    const newPage = currentPage + 1
    if (newPage <= maxPage) {
      goToPage(roomID, newPage)
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
          width="3rem"
          height="3rem"
          image="/static/icons/firstLastPage.svg"
          imageHover="/static/icons/firstLastPageLight.svg"
          imageActive="/static/icons/firstLastPageLight.svg"
          onClick={goFirstPage}
        />
        <ToolButton
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
              value={displayPageNum}
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
          onClick={goNextPage}
        />
        <ReverseToolButton
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

const mapStateToProps = ({ pages }): PageState => ({
  maxPage: pages.maxPage,
  currentPage: pages.currentPage,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  goToPage(roomID, pageNum): void {
    socket.emit("client change page", { roomID, pageNum })
    dispatch(goToPage(pageNum))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
