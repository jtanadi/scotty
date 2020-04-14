import { Packet } from "socket.io"

import { rooms } from "../cache"
import { Connection, RoomData } from "../types"

export default (
  connection: Connection,
  packet: Packet,
  next: () => void
): void => {
  const { io, socket } = connection
  const data: RoomData = packet[1]

  const { roomID } = data

  const room = rooms[roomID]
  if (!room) {
    io.to(socket.id).emit("error", { message: `Room ${roomID} doesn't exist` })
    return
  }

  next()
}
