import React, { useState, useEffect, ReactElement } from "react"

import NavBar, { PageOption } from "./NavBar"
import PDFView from "../PDFView"
import socket from "../../socket"

import { RoomBackground } from "./styles"

enum ZOOMLIMIT {
  MIN = 1,
  MAX = 5,
}

type PropTypes = {
  id: string
  originalFilename: string
}

const Room: React.FC<PropTypes> = ({ id, originalFilename }): ReactElement => {
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

  const [scale, setScale] = useState(1)
  const handleZoom = (offset: number): void => {
    setScale(prev => {
      return prev + offset < ZOOMLIMIT.MIN || prev + offset > ZOOMLIMIT.MAX
        ? prev
        : prev + offset
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
      <RoomBackground>
        <NavBar
          pageNum={pageNum}
          maxPage={maxPage}
          filename={originalFilename}
          handleChangePage={handleChangePage}
          handleZoom={handleZoom}
        />
        {pdfFile ? (
          <PDFView
            file={`https://beam-me-up-scotty.s3.amazonaws.com/${pdfFile}`}
            pageNumber={pageNum}
            scale={scale}
            handleLoadSuccess={handleDocumentLoad}
          />
        ) : null}
      </RoomBackground>
    )
  }

  return <div>{error ? `ERROR: ${error}` : renderRoom()}</div>
}

export default Room
