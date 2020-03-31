import { rooms } from "./cache"
import { Connection, SocketData, Room } from "./types"

export default (connection: Connection, data: SocketData): void => {
  const { roomID, pdfUrl } = data
  rooms[roomID] = <Room>{
    users: [],
    pdfUrl,
    pageNum: 1,
  }
}
