import React, { ReactElement, useRef, useEffect } from "react"
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import randomColor from "randomcolor"

// Utils, etc.
import { RoomData, User } from "../../../../backend/src/sockets/types"
import socket from "../../socket"
import { Tool } from "../../utils/tools"

// Components
import NavBar from "../NavBar"
import Pointer from "../Pointer"
import { LocationState } from "../Home"
import LinkModal from "../LinkModal"
import DocumentView from "../DocumentView"
import ZoomBar from "../ZoomBar"
import ToolBar from "../ToolBar"

import { Background, COLORS } from "../globalStyles"
import { usePointer, useSocket } from "./hooks"
import * as actions from "../../store/actions"

interface PropTypes extends RouteComponentProps {
  id: string
  filename: string
}

const Room: React.FC<PropTypes & StateProps & DispatchProps> = ({
  id,
  filename,
  location,
  toolColor,
  pdfUrl,
  users,
  goToPage,
  setPages,
  selectedTool,
  setToolColor,
  setUsers,
  setPdfUrl,
  clearStore,
}): ReactElement => {
  const pageRef = useRef(null)

  useEffect(() => {
    setToolColor(randomColor({ luminosity: "bright" }))
  }, [])

  const { showMouse, setShowMouse, ownMouseX, ownMouseY } = usePointer(
    id,
    pageRef
  )

  const { userID, error, socketChangePage } = useSocket(
    id,
    toolColor,
    setPages,
    goToPage,
    setUsers,
    setPdfUrl
  )

  useEffect(() => {
    if (!selectedTool) {
      if (showMouse) {
        setShowMouse(false)
      }
      return
    }

    switch (selectedTool.name) {
      case "pointer":
        setShowMouse(true)
        break
    }
  }, [selectedTool])

  const history = useHistory()
  const handleClose = (): void => {
    const leaveRoomData: RoomData = { roomID: id }
    socket.emit("leave room", leaveRoomData)
    clearStore()
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
                color={user.toolColor}
              />
            )
          }
        })}
      </>
    )
  }

  const renderOwnPointer = (): ReactElement => {
    return showMouse ? (
      <Pointer x={ownMouseX} y={ownMouseY} color={toolColor} />
    ) : null
  }

  const renderHostModal = (): ReactElement => {
    if (!location?.state) return null
    return (location.state as LocationState).host ? (
      <LinkModal link={window.location.toString()} />
    ) : null
  }

  const renderRoom = (): ReactElement => {
    return (
      <Background color={COLORS.DOCUMENT_VIEW_BG}>
        {renderHostModal()}
        {renderPointers()}
        {renderOwnPointer()}
        <NavBar
          filename={filename}
          socketChangePage={socketChangePage}
          handleClose={handleClose}
        />
        {pdfUrl ? <DocumentView pageRef={pageRef} /> : null}
        <ZoomBar />
        <ToolBar />
      </Background>
    )
  }

  return (
    <div>{error && id !== "room-test" ? `ERROR: ${error}` : renderRoom()}</div>
  )
}

type StateProps = {
  selectedTool: Tool
  toolColor: string
  pdfUrl: string
  users: User[]
}

const mapStateToProps = ({ room, tools }): StateProps => ({
  selectedTool: tools.tools[tools.selectedIdx],
  toolColor: tools.color,
  pdfUrl: room.pdfUrl,
  users: room.users,
})

type DispatchProps = {
  goToPage(pageNum: number): void
  setPages(pages: string[]): void
  setToolColor(hex: string): void
  setUsers(users: User[]): void
  setPdfUrl(url: string): void
  clearStore(): void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  goToPage(pageNum): void {
    dispatch(actions.goToPage(pageNum))
  },
  setPages(pages): void {
    dispatch(actions.setPages(pages))
  },
  setToolColor(hex): void {
    dispatch(actions.setToolColor(hex))
  },
  setUsers(users): void {
    dispatch(actions.setUsers(users))
  },
  setPdfUrl(url: string): void {
    dispatch(actions.setPdfUrl(url))
  },
  clearStore(): void {
    dispatch(actions.clearRoom())
    dispatch(actions.clearPages())
  },
})

const ConnectedRoom = connect(mapStateToProps, mapDispatchToProps)(Room)
export default withRouter(ConnectedRoom) as any
