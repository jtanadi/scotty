import React, { ReactElement, useRef, useEffect } from "react"
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import randomColor from "randomcolor"

// Utils, etc.
import { RoomData } from "../../../../backend/src/sockets/types"
import socket from "../../socket"

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
import { RootState } from "../../store/types"

interface PropTypes extends RouteComponentProps {
  id: string
}

const Room: React.FC<PropTypes> = ({ id, location }): ReactElement => {
  const pageRef = useRef(null)
  const dispatch = useDispatch()
  const toolColor = useSelector((state: RootState) => state.tools.color)
  const pdfUrl = useSelector((state: RootState) => state.room.pdfUrl)
  const users = useSelector((state: RootState) => state.room.users)
  const userID = useSelector((state: RootState) => state.room.userID)
  const selectedTool = useSelector(
    (state: RootState) => state.tools.tools[state.tools.selectedIdx]
  )

  useEffect(() => {
    dispatch(actions.setToolColor(randomColor({ luminosity: "bright" })))
  }, [])

  const { showMouse, setShowMouse, ownMouseX, ownMouseY } = usePointer(
    id,
    pageRef
  )

  const {
    error,
    socketChangePage,
    socketUpdatePresenter,
    socketUpdateZoom,
    socketUpdateScroll,
  } = useSocket(id)

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
    dispatch(actions.clearRoom)
    dispatch(actions.clearZoom)
    dispatch(actions.clearPages)
    dispatch(actions.clearTools)
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
        {pdfUrl ? (
          <DocumentView
            pageRef={pageRef}
            socketUpdateScroll={socketUpdateScroll}
          />
        ) : null}
        <ZoomBar socketUpdateZoom={socketUpdateZoom} />
        <ToolBar
          socketUpdatePresenter={socketUpdatePresenter}
          socketUpdateZoom={socketUpdateZoom}
          socketUpdateScroll={socketUpdateScroll}
        />
      </Background>
    )
  }

  return (
    <div>{error && id !== "room-test" ? `ERROR: ${error}` : renderRoom()}</div>
  )
}

export default withRouter(Room) as any
