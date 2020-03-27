import { rooms } from "./cache"
import { Connection } from "./types"
import { SocketData } from "../../../shared/types"

export default (connection: Connection, data: SocketData): void => {
  const { roomID, pdfUrl } = data
  rooms[roomID] = {
    users: [],
    pdfUrl,
    currentPage: 1,
  }
}
