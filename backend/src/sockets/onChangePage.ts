import { rooms } from "./cache"
import { Connection, ChangePageData, SyncPageData } from "./types"

export default (connection: Connection, data: ChangePageData): void => {
  const { io } = connection
  const { roomID, pageNum } = data

  rooms[roomID].pageNum = pageNum

  const syncPageData: SyncPageData = { pageNum: rooms[roomID].pageNum }
  io.to(roomID).emit("sync page", syncPageData)
}
