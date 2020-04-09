import { rooms, usersMap } from "./cache"
import { Connection, CreateRoomData, Room } from "./types"

export default (connection: Connection, data: CreateRoomData): void => {
  const { socket } = connection
  const { roomID, pdfUrl } = data

  const newRoom: Room = {
    users: [],
    pdfUrl,
    pageNum: 1,
  }

  rooms[roomID] = newRoom

  // Cache user to room without joining room
  usersMap[socket.id] = roomID
}
