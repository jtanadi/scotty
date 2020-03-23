import React, { useState, useEffect, ReactElement } from "react"

import NavBar, { PageOption } from "./NavBar"
import PDFView from "../PDFView"
import socket from "../../socket"

import { RoomContainer } from "./styles"

type PropTypes = {
  id: string
}

const Room: React.FC<PropTypes> = ({ id }): ReactElement => {
  const [pdfFile, setPdfFile] = useState("")
  const [error, setError] = useState("")

  const [maxPage, setMaxPage] = useState(1)
  const handleDocumentLoad = ({ numPages }): void => {
    setMaxPage(numPages)
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

  const renderRoom = (): ReactElement => {
    return (
      <RoomContainer>
        <NavBar
          pageNum={pageNum}
          maxPage={maxPage}
          handleChangePage={handleChangePage}
        />
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

  return <div>{error ? `ERROR: ${error}` : renderRoom()}</div>
}

export default Room
