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
} from "../../../../../backend/src/sockets/types"
import socket from "../../../socket"

type UseSocketReturn = {
  error: string
  socketChangePage: (pageNum: number) => void
  socketUpdatePresenter: () => void
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
  setPresenter: (presenterID: string) => void
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

  return { error, socketChangePage, socketUpdatePresenter }
}
