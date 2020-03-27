import { rooms } from "./cache"
import { Connection } from "./types"
import { SocketData } from "../../../shared/types"

export default (connection: Connection, data: SocketData): void => {
  const { io } = connection
  const { roomID, pageNum } = data

  rooms[roomID].pageNum = pageNum
  io.to(roomID).emit("sync page", data)
}
