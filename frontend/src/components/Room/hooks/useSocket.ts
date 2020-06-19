import { useState, useEffect } from "react"

import {
  RoomData,
  JoinRoomData,
  SyncDocData,
  SyncPageData,
  User,
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

type UseSocketReturn = {
  error: string
  socketChangePage: (pageNum: number) => void
  socketUpdatePresenter: () => void
  socketUpdateZoom: (zoom: number) => void
  socketUpdateScroll: (left: number, top: number) => void
}

export default (
  roomID: string,
  toolColor: string,
  setPages: (pages: string[]) => void,
  goToPage: (pageNum: number) => void,
  setUsers: (users: User[]) => void,
  setUserID: (id: string) => void,
  setPdfUrl: (url: string) => void,
  setFilename: (filename: string) => void,
  setPresenter: (presenterID: string) => void,
  setZoomLevel: (zoomLevel: number) => void,
  setScrollRatios: (left: number, top: number) => void
): UseSocketReturn => {
  const [error, setError] = useState("")
  useEffect(() => {
    const joinRoomData: JoinRoomData = { roomID, toolColor }
    socket.emit("join room", joinRoomData)

    socket.on("sync document", (data: SyncDocData): void => {
      setUserID(data.userID)
      setPdfUrl(data.pdfUrl)
      setPages(data.pages)
      setFilename(data.filename)
      setPresenter(data.presenterID)

      if (data.presenterID && data.presenterID !== data.userID) {
        setZoomLevel(data.zoom)
        setScrollRatios(data.scrollLeft, data.scrollTop)
      }
    })

    socket.on("sync page", (data: SyncPageData): void => {
      goToPage(data.pageNum)
    })

    socket.on("update users", (data: UsersData): void => {
      setUsers(data.users)
    })

    socket.on("update presenter", (data: PresenterData) => {
      setPresenter(data.presenterID)
    })

    socket.on("update zoom", (data: SyncZoomData) => {
      setZoomLevel(data.zoom)
    })

    socket.on("update scroll", (data: SyncScrollData) => {
      setScrollRatios(data.scrollLeft, data.scrollTop)
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
