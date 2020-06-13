import React, { ReactElement, useRef, useEffect } from "react"
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import randomColor from "randomcolor"

// Utils, etc.
import { RoomData } from "../../../../backend/src/sockets/types"
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
import { goToPage, setPages, setToolColor } from "../../store/actions"

interface PropTypes extends RouteComponentProps {
  id: string
  filename: string
}

const Room: React.FC<PropTypes & StateProps & DispatchProps> = ({
  id,
  filename,
  location,
  pageNum,
  goToPage,
  pages,
  setPages,
  selectedTool,
  toolColor,
  setToolColor,
}): ReactElement => {
  const pageRef = useRef(null)

  useEffect(() => {
    setToolColor(randomColor({ luminosity: "bright" }))
  }, [])

  const { showMouse, setShowMouse, ownMouseX, ownMouseY } = usePointer(
    id,
    pageRef
  )

  const { userID, users, pdfUrl, error } = useSocket(
    id,
    toolColor,
    setPages,
    goToPage
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
        <ToolBar showMouse={showMouse} />
      </Background>
    )
  }

  return (
    <div>{error && id !== "room-test" ? `ERROR: ${error}` : renderRoom()}</div>
  )
}

type StateProps = {
  pageNum: number
  pages: string[]
  selectedTool: Tool
  toolColor: string
}

const mapStateToProps = ({ pages, tools }): StateProps => ({
  pageNum: pages.currentPage,
  pages: pages.pages,
  selectedTool: tools.tools[tools.selectedIdx],
  toolColor: tools.color,
})

type DispatchProps = {
  goToPage(pageNum: number): void
  setPages(pages: string[]): void
  setToolColor(hex: string): void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  goToPage(pageNum): void {
    dispatch(goToPage(pageNum))
  },
  setPages(pages): void {
    dispatch(setPages(pages))
  },
  setToolColor(hex): void {
    dispatch(setToolColor(hex))
  },
})

const ConnectedRoom = connect(mapStateToProps, mapDispatchToProps)(Room)
export default withRouter(ConnectedRoom) as any
