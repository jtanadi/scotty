import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  RoomData,
  JoinRoomData,
  SyncDocData,
  SyncPageData,
  UsersData,
  ToolColorChangeData,
  ChangePageData,
  PresenterData,
  ChangeScrollData,
  SyncScrollData,
  ChangeZoomData,
  SyncZoomData,
} from "../../../../../backend/src/sockets/types"
import socket from "../../../socket"
import * as actions from "../../../store/actions"
import { RootState } from "../../../store/types"

type UseSocketReturn = {
  error: string
  socketChangePage: (pageNum: number) => void
  socketUpdatePresenter: () => void
  socketUpdateZoom: (zoom: number) => void
  socketUpdateScroll: (left: number, top: number) => void
}

export default (roomID: string): UseSocketReturn => {
  const dispatch = useDispatch()
  const toolColor = useSelector((state: RootState) => state.tools.color)

  const [error, setError] = useState("")
  useEffect(() => {
    const joinRoomData: JoinRoomData = { roomID, toolColor }
    socket.emit("join room", joinRoomData)

    socket.on("sync document", (data: SyncDocData): void => {
      dispatch(actions.setUserID(data.userID))
      dispatch(actions.setPdfUrl(data.pdfUrl))
      dispatch(actions.setPages(data.pages))
      dispatch(actions.setFilename(data.filename))
      dispatch(actions.setPresenter(data.presenterID))

      if (data.presenterID && data.presenterID !== data.userID) {
        dispatch(actions.setZoomLevel(data.zoom))
        dispatch(actions.setScrollRatios(data.scrollLeft, data.scrollTop))
      }
    })

    socket.on("sync page", (data: SyncPageData): void => {
      dispatch(actions.goToPage(data.pageNum))
    })

    socket.on("update users", (data: UsersData): void => {
      dispatch(actions.setUsers(data.users))

      if (typeof data.presenterID !== "undefined") {
        dispatch(actions.setPresenter(data.presenterID))
      }
    })

    socket.on("update presenter", (data: PresenterData) => {
      dispatch(actions.setPresenter(data.presenterID))
    })

    socket.on("update zoom", (data: SyncZoomData) => {
      dispatch(actions.setZoomLevel(data.zoom))
    })

    socket.on("update scroll", (data: SyncScrollData) => {
      dispatch(actions.setScrollRatios(data.scrollLeft, data.scrollTop))
    })

    socket.on("error", (data: Error): void => {
      setError(data.message)
    })

    return (): void => {
      socket.off("sync document")
      socket.off("sync page")
      socket.off("update users")
      socket.off("update presenter")
      socket.off("update zoom")
      socket.off("update scroll")
      socket.off("error")
    }
  }, [])

  useEffect(() => {
    if (toolColor) {
      const data: ToolColorChangeData = { roomID, toolColor }
      socket.emit("change tool color", data)
    }
  }, [toolColor])

  const socketChangePage = (pageNum: number): void => {
    const data: ChangePageData = { roomID, pageNum }
    socket.emit("client change page", data)
  }

  const socketUpdatePresenter = (): void => {
    const data: RoomData = { roomID }
    socket.emit("client update presenter", data)
  }

  const socketUpdateZoom = (zoom: number): void => {
    const data: ChangeZoomData = { roomID, zoom }
    socket.emit("client update zoom", data)
  }

  const socketUpdateScroll = (scrollLeft: number, scrollTop: number): void => {
    const data: ChangeScrollData = { roomID, scrollLeft, scrollTop }
    socket.emit("client update scroll", data)
  }

  return {
    error,
    socketChangePage,
    socketUpdatePresenter,
    socketUpdateZoom,
    socketUpdateScroll,
  }
}
