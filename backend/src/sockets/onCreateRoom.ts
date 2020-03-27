import { rooms } from "./cache"
import { Connection, SocketData } from "./types"

export default (connection: Connection, data: SocketData): void => {
  const { roomID, pdfUrl } = data
  rooms[roomID] = {
    users: [],
    pdfUrl,
    currentPage: 1,
  }
}
