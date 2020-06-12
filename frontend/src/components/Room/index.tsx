import React, { useState, ReactElement, useRef } from "react"
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Dispatch } from "redux"

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
import { usePointer, useSocket } from "./hooks"
import { setMaxPage, goToPage } from "../../store/actions"

interface PropTypes extends RouteComponentProps {
  id: string
  filename: string
}

type StateProps = {
  pageNum: number
}

type DispatchProps = {
  setMaxPage(pageNum: number): void
  goToPage(pageNum: number): void
}

const Room: React.FC<PropTypes & StateProps & DispatchProps> = ({
  id,
  filename,
  location,
  pageNum,
  setMaxPage,
  goToPage,
}): ReactElement => {
  const pageRef = useRef(null)

  const [pages, setPages] = useState<string[]>([])
  const { showMouse, handlePointerToggle, ownMouseX, ownMouseY } = usePointer(
    id,
    pageRef
  )
  const {
    pointerColor,
    handlePointerColor,
    userID,
    users,
    pdfUrl,
    error,
  } = useSocket(id, setPages, setMaxPage, goToPage)

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
          roomID={id}
          filename={filename}
          users={users}
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

const mapStateToProps = ({ pages }): StateProps => ({
  pageNum: pages.currentPage,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setMaxPage(maxPage): void {
    dispatch(setMaxPage(maxPage))
  },
  goToPage(pageNum): void {
    dispatch(goToPage(pageNum))
  },
})

const ConnectedRoom = connect(mapStateToProps, mapDispatchToProps)(Room)
export default withRouter(ConnectedRoom) as any
