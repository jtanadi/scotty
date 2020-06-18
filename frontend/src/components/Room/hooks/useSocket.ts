import { useState, useEffect } from "react"

import {
  JoinRoomData,
  SyncDocData,
  SyncPageData,
  User,
  UsersData,
  ToolColorChangeData,
  ChangePageData,
} from "../../../../../backend/src/sockets/types"
import socket from "../../../socket"

type UseSocketReturn = {
  userID: string
  error: string
  socketChangePage: (pageNum: number) => void
}

export default (
  roomID: string,
  toolColor: string,
  setPages: (pages: string[]) => void,
  goToPage: (pageNum: number) => void,
  setUsers: (users: User[]) => void,
  setPdfUrl: (url: string) => void,
  setFilename: (filename: string) => void
): UseSocketReturn => {
  const [userID, setUserID] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {
    const joinRoomData: JoinRoomData = { roomID, toolColor }
    socket.emit("join room", joinRoomData)

    socket.on("sync document", (data: SyncDocData): void => {
      setUserID(data.userID)
      setPdfUrl(data.pdfUrl)
      setPages(data.pages)
      setFilename(data.filename)
    })

    socket.on("sync page", (data: SyncPageData): void => {
      goToPage(data.pageNum)
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

  return { userID, error, socketChangePage }
}
