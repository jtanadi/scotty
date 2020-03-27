import { rooms } from "./cache"
import { Connection, ClientData } from "./types"

export default (connection: Connection, data: ClientData): void => {
  const { roomID, pdfUrl } = data
  rooms[roomID] = {
    users: [],
    pdfUrl,
    currentPage: 1,
  }
}
