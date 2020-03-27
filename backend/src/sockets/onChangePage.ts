import { rooms } from "./cache"
import { Connection, ClientData } from "./types"

export default (connection: Connection, data: ClientData): void => {
  const { io } = connection
  const { roomID, pageNum } = data

  rooms[roomID].pageNum = pageNum
  io.to(roomID).emit("sync page", data)
}
