import { rooms } from "./cache"
import { Connection, CreateRoomData, Room, RoomData } from "./types"

export default (connection: Connection, data: CreateRoomData): void => {
  const { io } = connection
  const { hostID, roomID, pdfUrl, numPages } = data

  const newRoom: Room = {
    users: [],
    pdfUrl,
    pageNum: 1,
    numPages,
  }

  rooms[roomID] = newRoom

  // Send private message back to room creator with roomID
  const roomCreatedData: RoomData = { roomID }
  io.to(hostID).emit("room created", roomCreatedData)
}
