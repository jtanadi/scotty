import { rooms } from "./cache"
import { Connection, ChangePageData, SyncPageData } from "./types"

export default (connection: Connection, data: ChangePageData): void => {
  const { io, socket } = connection
  const { roomID, pageNum } = data

  const room = rooms[roomID]
  if (!room) {
    io.to(socket.id).emit("error", { message: `Room ${roomID} doesn't exist` })
    return
  }

  room.pageNum = pageNum

  const syncPageData: SyncPageData = { pageNum: room.pageNum }
  io.to(roomID).emit("sync page", syncPageData)
}
