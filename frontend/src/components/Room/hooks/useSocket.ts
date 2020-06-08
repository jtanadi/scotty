import { useState, useEffect, Dispatch, SetStateAction } from "react"
import randomColor from "randomcolor"

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
  pointerColor: string
  handlePointerColor(color: string): void
  userID: string
  users: User[]
  pdfUrl: string
  error: string
}

export default (
  roomID: string,
  setPages: Dispatch<SetStateAction<string[]>>,
  setPageNum: Dispatch<SetStateAction<number>>
): UseSocketReturn => {
  const [pointerColor, setPointerColor] = useState("")
  const [userID, setUserID] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [pdfUrl, setPdfUrl] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {
    const color = randomColor({ luminosity: "bright" })
    setPointerColor(color)

    const joinRoomData: JoinRoomData = { roomID, pointerColor: color }
    socket.emit("join room", joinRoomData)

    socket.on("sync document", (data: SyncDocData): void => {
      setUserID(data.userID)
      setPdfUrl(data.pdfUrl)
      setPages(data.pages)
    })

    socket.on("sync page", (data: SyncPageData): void => {
      setPageNum(data.pageNum)
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

  const handlePointerColor = (color: string): void => {
    setPointerColor(color)

    const pointerChangeData: PointerChangeData = { roomID, color }
    socket.emit("change pointer color", pointerChangeData)
  }

  return { pointerColor, handlePointerColor, userID, users, pdfUrl, error }
}
