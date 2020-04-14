import { rooms } from "./cache"
import { Connection, CreateRoomData, Room, RoomData } from "./types"

const s3Url = "https://beam-me-up-scotty.s3.amazonaws.com"

export default (connection: Connection, data: CreateRoomData): void => {
  const { io } = connection
  const { hostID, roomID, s3Dir, pages } = data

  const newRoom: Room = {
    users: [],
    s3Dir,
    pdfUrl: `${s3Url}/${s3Dir}`,
    pageNum: 1,
    pages,
  }

  rooms[roomID] = newRoom

  // Send private message back to room creator with roomID
  const roomCreatedData: RoomData = { roomID }
  io.to(hostID).emit("room created", roomCreatedData)
}
