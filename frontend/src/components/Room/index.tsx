import React, { useState, useEffect, ReactElement } from "react"

import PDFView from "../PDFView"
import socket from "../../socket"

import {
  ButtonsContainer,
  NavBar,
  NavButton,
  PageInfo,
  RoomContainer,
} from "./styles"

type PropType = {
  id: string
}

const Room: React.FC<PropType> = ({ id }): ReactElement => {
  const [pdfFile, setPdfFile] = useState("")
  const [error, setError] = useState("")

  const [maxPage, setMaxPage] = useState(1)
  const handleDocumentLoad = ({ numPages }): void => {
    setMaxPage(numPages)
  }

  type PageOption = {
    offset?: number
    goto?: number
  }
  const [pageNum, setPageNum] = useState(1)
  const handleChangePage = (option: PageOption): void => {
    const { offset, goto } = option
    setPageNum(current => {
      let newPageNum: number
      if (offset) {
        newPageNum = current + offset
      } else if (goto) {
        newPageNum = goto
      }

      if (newPageNum <= maxPage && newPageNum >= 1) {
        socket.emit("client change page", { roomID: id, pageNum: newPageNum })
        return newPageNum
      }

      return current
    })
  }

  useEffect(() => {
    socket.emit("join room", { roomID: id })

    socket.on("sync document", (data): void => {
      setPdfFile(data.pdfUrl)
    })

    socket.on("sync page", (data): void => {
      setPageNum(data.pageNum)
    })

    socket.on("error", (data): void => {
      setError(data.message)
    })
  }, [])

  const renderElmts = (): ReactElement => {
    return (
      <RoomContainer>
        <NavBar>
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
            <NavButton
              onClick={(): void => handleChangePage({ goto: maxPage })}
            >
              {`>>`}
            </NavButton>
          </ButtonsContainer>
        </NavBar>
        {pdfFile ? (
          <PDFView
            file={`https://beam-me-up-scotty.s3.amazonaws.com/${pdfFile}`}
            pageNumber={pageNum}
            handleLoadSuccess={handleDocumentLoad}
          />
        ) : null}
      </RoomContainer>
    )
  }

  return <div>{error ? `ERROR: ${error}` : renderElmts()}</div>
}

export default Room
