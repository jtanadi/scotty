import { Packet } from "socket.io"

import { rooms } from "../cache"
import { Connection, ChangePageData, JoinLeaveRoomData } from "../types"

export default (
  connection: Connection,
  packet: Packet,
  next: () => void
): void => {
  const { io, socket } = connection
  const message: string = packet[0]

  if (message === "create room") {
    next()
  }

  const data: ChangePageData | JoinLeaveRoomData = packet[1]
  const { roomID } = data

  const room = rooms[roomID]
  if (!room) {
    io.to(socket.id).emit("error", { message: `Room ${roomID} doesn't exist` })
    return
  }

  next()
}
