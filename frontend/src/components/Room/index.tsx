import React, { useState, ReactElement, useRef } from "react"
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom"

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
import ToolBar, { TOOLS } from "../ToolBar"

import { Background, COLORS } from "../globalStyles"
import { usePointer, usePageNum, useSocket } from "./hooks"

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

  const [pages, setPages] = useState<string[]>([])
  const { showMouse, handlePointerToggle, ownMouseX, ownMouseY } = usePointer(
    id,
    pageRef
  )
  const { pageNum, setPageNum, handleChangePage } = usePageNum(id, pages)
  const {
    pointerColor,
    handlePointerColor,
    userID,
    users,
    pdfUrl,
    error,
  } = useSocket(id, setPages, setPageNum)

  const handleToolBarButton = (tool: TOOLS): void => {
    switch (tool) {
      case TOOLS.POINTER:
        handlePointerToggle()
        break
    }
  }

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

  const renderOwnPointer = (): ReactElement => {
    return showMouse ? (
      <Pointer x={ownMouseX} y={ownMouseY} color={pointerColor} />
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
          pageNum={pageNum}
          maxPage={pages.length}
          filename={filename}
          users={users}
          handleChangePage={handleChangePage}
          handleClose={handleClose}
        />
        {pdfUrl ? (
          <DocumentView
            src={`${pdfUrl}/${pages[pageNum - 1]}`}
            pageRef={pageRef}
          />
        ) : null}
        <ZoomBar />
        <ToolBar
          pointerColor={pointerColor}
          handlePointerColor={handlePointerColor}
          showMouse={showMouse}
          handleToolBarButton={handleToolBarButton}
        />
      </Background>
    )
  }

  return (
    <div>{error && id !== "room-test" ? `ERROR: ${error}` : renderRoom()}</div>
  )
}

export default withRouter(Room) as any
