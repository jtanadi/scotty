import { useState, useEffect } from "react"

import {
  JoinRoomData,
  SyncDocData,
  SyncPageData,
  User,
  UsersData,
  PointerChangeData,
} from "../../../../../backend/src/sockets/types"
import socket from "../../../socket"

type UseSocketReturn = {
  userID: string
  users: User[]
  pdfUrl: string
  error: string
}

export default (
  roomID: string,
  toolColor: string,
  setPages: (pages: string[]) => void,
  goToPage: (pageNum: number) => void
): UseSocketReturn => {
  const [userID, setUserID] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [pdfUrl, setPdfUrl] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {
    const joinRoomData: JoinRoomData = { roomID, pointerColor: toolColor }
    socket.emit("join room", joinRoomData)

    socket.on("sync document", (data: SyncDocData): void => {
      setUserID(data.userID)
      setPdfUrl(data.pdfUrl)
      setPages(data.pages)
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
      const pointerChangeData: PointerChangeData = { roomID, color: toolColor }
      socket.emit("change pointer color", pointerChangeData)
    }
  }, [toolColor])

  return { userID, users, pdfUrl, error }
}
