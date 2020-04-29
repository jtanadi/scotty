import React, { useState, useEffect, ReactElement, useRef } from "react"
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom"
import randomColor from "randomcolor"

// Utils, etc.
import {
  RoomData,
  JoinRoomData,
  SyncDocData,
  SyncPageData,
  User,
  UsersData,
} from "../../../../backend/src/sockets/types"
import socket from "../../socket"

// Components
import NavBar from "./NavBar"
import Pointer from "../Pointer"
import { LocationState } from "../Home"
import LinkModal from "../LinkModal"
import DocumentView from "../DocumentView"

import { RoomBackground } from "./styles"
import { usePointer, usePageNum, useZoom } from "./hooks"

interface PropTypes extends RouteComponentProps {
  id: string
  filename: string
}

const Room: React.FC<PropTypes> = ({
  id,
  filename,
  location,
}): ReactElement => {
  const pageRef = useRef(null)

  const [pages, setPages] = useState([])
  const [showMouse, handlePointerToggle] = usePointer(id, pageRef)
  const [pageNum, setPageNum, handleChangePage] = usePageNum(id, pages)
  const [scale, handleZoom] = useZoom()

  const [pointerColor, setPointerColor] = useState("")
  const [userID, setUserID] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [pdfUrl, setPdfUrl] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {
    const color = randomColor({ luminosity: "bright" })
    setPointerColor(color)

    const joinRoomData: JoinRoomData = { roomID: id, pointerColor: color }
    socket.emit("join room", joinRoomData)

    socket.on("sync document", (data: SyncDocData): void => {
      setUserID(data.userID)
      setPdfUrl(data.pdfUrl)
      setPages(data.pages)
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

    return (): void => {
      socket.off("sync document")
      socket.off("sync page")
      socket.off("update users")
      socket.off("error")
    }
  }, [])

  const history = useHistory()
  const handleClose = (): void => {
    const leaveRoomData: RoomData = { roomID: id }
    socket.emit("leave room", leaveRoomData)
    history.push("/")
  }

  const renderPointers = (): ReactElement => {
    return (
      <>
        {users.map(user => {
          if (user.id !== userID && user.mouseX && user.mouseY) {
            if (!pageRef.current) return

            const {
              offsetLeft,
              offsetTop,
              clientWidth,
              clientHeight,
              offsetParent,
            } = pageRef.current

            const mouseX = offsetLeft + user.mouseX * clientWidth
            const mouseY =
              offsetTop + offsetParent.offsetTop + user.mouseY * clientHeight

            return (
              <Pointer
                key={user.id}
                x={mouseX}
                y={mouseY}
                color={user.pointerColor}
              />
            )
          }
        })}
      </>
    )
  }

  const renderModal = (): ReactElement => {
    if (!location?.state) return null
    return (location.state as LocationState).host ? (
      <LinkModal link={window.location.toString()} />
    ) : null
  }

  const renderRoom = (): ReactElement => {
    return (
      <RoomBackground>
        {renderModal()}
        {renderPointers()}
        <NavBar
          pageNum={pageNum}
          maxPage={pages.length}
          filename={filename}
          users={users}
          showMouse={showMouse}
          pointerColor={pointerColor}
          handleChangePage={handleChangePage}
          handleZoom={handleZoom}
          handleClose={handleClose}
          handlePointerToggle={handlePointerToggle}
        />
        {pdfUrl ? (
          <DocumentView
            src={`${pdfUrl}/${pages[pageNum - 1]}`}
            scale={scale}
            pageRef={pageRef}
          />
        ) : null}
      </RoomBackground>
    )
  }

  return <div>{error ? `ERROR: ${error}` : renderRoom()}</div>
}

export default withRouter(Room) as any
