import React, { useState, useEffect, ReactElement } from "react"

import PDFView from "../PDFView"
import socket from "../../socket"

const Room: React.FC<{}> = (): ReactElement => {
  const [maxPage, setMaxPage] = useState(1)
  const handleDocumentLoad = ({ numPages }): void => {
    setMaxPage(numPages)
  }

  const [pageNum, setPageNum] = useState(1)
  const handleButton = (offset: number): void => {
    const roomID = window.location.hash.replace("#/", "").replace("room=", "")
    setPageNum(current => {
      const newPageNum = current + offset
      if (newPageNum <= maxPage && newPageNum >= 1) {
        socket.emit("client change page", { roomID, pageNum: newPageNum })
        return newPageNum
      }
      return current
    })
  }

  useEffect(() => {
    const roomID = window.location.hash.replace("#/", "").replace("room=", "")
    socket.emit("join room", { roomID })

    socket.on("sync page", data => {
      setPageNum(data.pageNum)
    })
  }, [])

  return (
    <div>
      <button onClick={(): void => handleButton(-1)}>Prev</button>
      <button onClick={(): void => handleButton(1)}>Next</button>
      <PDFView
        file="/sample.pdf"
        pageNumber={pageNum}
        handleLoadSuccess={handleDocumentLoad}
      />
    </div>
  )
}

export default Room
