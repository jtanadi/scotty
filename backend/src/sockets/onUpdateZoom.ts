import { Connection, ChangeZoomData, SyncZoomData } from "./types"
import { rooms } from "./cache"

export default (connection: Connection, data: ChangeZoomData): void => {
  const { socket } = connection
  const { roomID, zoom } = data

  const room = rooms[roomID]
  room.zoom = zoom

  const zoomData: SyncZoomData = { zoom }
  socket.broadcast.to(roomID).emit("update zoom", zoomData)
}
