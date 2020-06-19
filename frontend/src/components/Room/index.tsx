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
}

const Room: React.FC<PropTypes & StateProps & DispatchProps> = ({
  id,
  location,
  toolColor,
  pdfUrl,
  users,
  userID,
  goToPage,
  setPages,
  selectedTool,
  setToolColor,
  setUsers,
  setUserID,
  setPdfUrl,
  clearStore,
  setFilename,
  setPresenter,
}): ReactElement => {
  const pageRef = useRef(null)

  useEffect(() => {
    setToolColor(randomColor({ luminosity: "bright" }))
  }, [])

  const { showMouse, setShowMouse, ownMouseX, ownMouseY } = usePointer(
    id,
    pageRef
  )

  const { error, socketChangePage, socketUpdatePresenter } = useSocket(
    id,
    toolColor,
    setPages,
    goToPage,
    setUsers,
    setUserID,
    setPdfUrl,
    setFilename,
    setPresenter
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
        <NavBar socketChangePage={socketChangePage} handleClose={handleClose} />
        {pdfUrl ? <DocumentView pageRef={pageRef} /> : null}
        <ZoomBar />
        <ToolBar socketUpdatePresenter={socketUpdatePresenter} />
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
  userID: string
}

const mapStateToProps = ({
  room: { pdfUrl, users, userID },
  tools,
}): StateProps => ({
  selectedTool: tools.tools[tools.selectedIdx],
  toolColor: tools.color,
  pdfUrl,
  users,
  userID,
})

type DispatchProps = {
  goToPage(pageNum: number): void
  setPages(pages: string[]): void
  setToolColor(hex: string): void
  setUsers(users: User[]): void
  setUserID(id: string): void
  setPdfUrl(url: string): void
  clearStore(): void
  setFilename(filename: string): void
  setPresenter(presenterID: string): void
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
  setUserID(id): void {
    dispatch(actions.setUserID(id))
  },
  setPdfUrl(url: string): void {
    dispatch(actions.setPdfUrl(url))
  },
  clearStore(): void {
    dispatch(actions.clearRoom())
    dispatch(actions.clearPages())
    dispatch(actions.clearZoom())
    dispatch(actions.clearTools())
  },
  setFilename(filename): void {
    dispatch(actions.setFilename(filename))
  },

  setPresenter(presenterID): void {
    dispatch(actions.setPresenter(presenterID))
  },
})

const ConnectedRoom = connect(mapStateToProps, mapDispatchToProps)(Room)
export default withRouter(ConnectedRoom) as any
