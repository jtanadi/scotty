import { rooms } from "./cache"
import { Connection, SocketData } from "./types"

export default (connection: Connection, data: SocketData): void => {
  const { roomID, pdfUrl } = data
  rooms[roomID] = {
    userIDs: [],
    pdfUrl,
    pageNum: 1,
  }
}
