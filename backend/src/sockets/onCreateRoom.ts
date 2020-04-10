import { rooms } from "./cache"
import { Connection, CreateRoomData, Room, RoomData } from "./types"

export default (connection: Connection, data: CreateRoomData): void => {
  const { io, socket } = connection
  const { roomID, pdfUrl } = data

  const newRoom: Room = {
    users: [],
    pdfUrl,
    pageNum: 1,
  }

  rooms[roomID] = newRoom

  // Send private message back to room creator with roomID
  const roomCreatedData: RoomData = { roomID }
  io.to(socket.id).emit("room created", roomCreatedData)
}
