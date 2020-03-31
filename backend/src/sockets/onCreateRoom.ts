import { rooms } from "./cache"
import { Connection, CreateRoomData, Room } from "./types"

export default (connection: Connection, data: CreateRoomData): void => {
  const { roomID, pdfUrl } = data

  const newRoom: Room = {
    users: [],
    pdfUrl,
    pageNum: 1,
  }
  rooms[roomID] = newRoom
}
