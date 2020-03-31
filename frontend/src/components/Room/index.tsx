import React, { useState, useEffect, ReactElement } from "react"
import { useHistory } from "react-router-dom"

// Components
import NavBar, { PageOption } from "./NavBar"
import PDFView from "../PDFView"
import Pointer from "../Pointer"

import {
  JoinRoomData,
  SyncDocData,
  SyncPageData,
  User,
  UsersData,
} from "../../../../backend/src/sockets/types"
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

  const handleMouseMove = (ev: MouseEvent): void => {
    socket.emit("mousemove", {
      roomID: id,
      mouseX: ev.clientX,
      mouseY: ev.clientY,
    })
  }

  const [userID, setUserID] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [pdfFile, setPdfFile] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {
    const joinRoomData: JoinRoomData = { roomID: id }
    socket.emit("join room", joinRoomData)

    socket.on("sync document", (data: SyncDocData): void => {
      setUserID(data.userID)
      setPdfFile(data.pdfUrl)
    })

    socket.on("sync page", (data: SyncPageData): void => {
      setPageNum(data.pageNum)
    })

    socket.on("update users", (data: UsersData): void => {
      setUsers(data.users)
    })

    socket.on("error", (data: Error): void => {
      setError(data.message)
    })

    document.addEventListener("mousemove", handleMouseMove)

    return (): void => {
      socket.off("sync document")
      socket.off("sync page")
      socket.off("update users")
      socket.off("error")

      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const history = useHistory()
  const handleClose = (): void => {
    socket.emit("leave room")
    history.push("/")
  }

  const renderPointers = (): ReactElement => {
    return (
      <>
        {users.map(user => {
          if (user.id !== userID) {
            return (
              <Pointer
                key={user.id}
                x={user.mouseX}
                y={user.mouseY}
                color="red"
              />
            )
          }
        })}
      </>
    )
  }

  const renderRoom = (): ReactElement => {
    return (
      <RoomBackground>
        {renderPointers()}
        <NavBar
          pageNum={pageNum}
          maxPage={maxPage}
          filename={originalFilename}
          users={users}
          handleChangePage={handleChangePage}
          handleZoom={handleZoom}
          handleClose={handleClose}
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
