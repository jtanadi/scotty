import { rooms } from "./cache"
import { Connection, ChangePageData, SyncPageData } from "./types"

export default (connection: Connection, data: ChangePageData): void => {
  const { io } = connection
  const { roomID, pageNum } = data

  const room = rooms[roomID]
  room.pageNum = pageNum

  const syncPageData: SyncPageData = { pageNum: room.pageNum }
  io.to(roomID).emit("sync page", syncPageData)
}
