import { Connection, ChangeScrollData, SyncScrollData } from "./types"
import { rooms } from "./cache"

export default (connection: Connection, data: ChangeScrollData): void => {
  const { socket } = connection
  const { roomID, scrollLeft, scrollTop } = data

  const room = rooms[roomID]
  room.scrollLeft = scrollLeft
  room.scrollTop = scrollTop

  const scrollData: SyncScrollData = { scrollLeft, scrollTop }
  socket.broadcast.to(roomID).emit("update scroll", scrollData)
}
