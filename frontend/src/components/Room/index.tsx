import React, { useState, useEffect, ReactElement } from "react"

import PDFView from "../PDFView"
import socket from "../../socket"

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

  const [pageNum, setPageNum] = useState(1)
  const handleChangePage = (offset: number): void => {
    setPageNum(current => {
      const newPageNum = current + offset
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
      <>
        <button onClick={(): void => handleChangePage(-1)}>Prev</button>
        <button onClick={(): void => handleChangePage(1)}>Next</button>
        {pdfFile ? (
          <PDFView
            file={`https://beam-me-up-scotty.s3.amazonaws.com/${pdfFile}`}
            pageNumber={pageNum}
            maxPage={maxPage}
            handleLoadSuccess={handleDocumentLoad}
          />
        ) : null}
      </>
    )
  }

  return <div>{error ? `ERROR: ${error}` : renderElmts()}</div>
}

export default Room
