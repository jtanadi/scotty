import { users, rooms } from "./cache"
import { Connection, SocketData } from "./types"

export default (connection: Connection, data: SocketData): void => {
  const { io, socket } = connection
  const { roomID } = data

  if (!rooms[roomID]) {
    io.to(socket.id).emit("error", { message: `Room ${roomID} doesn't exist` })
    return
  }

  rooms[roomID].users.push(socket.id)
  users[socket.id] = roomID
  socket.join(roomID)

  // Make sure we're looking at the same doc & page when joining
  const pdfUrl = rooms[roomID].pdfUrl || ""
  io.to(socket.id).emit("sync document", { pdfUrl })

  const pageNum = rooms[roomID].pageNum || 1
  io.to(socket.id).emit("sync page", { pageNum })
}
