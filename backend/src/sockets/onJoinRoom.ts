import { usersMap, rooms } from "./cache"
import { Connection, SocketData, User } from "./types"

const createUser = (id: string): User => {
  return {
    id,
    mouseX: 0,
    mouseY: 0,
  }
}

export default (connection: Connection, data: SocketData): void => {
  const { io, socket } = connection
  const { roomID } = data

  const room = rooms[roomID]
  if (!room) {
    io.to(socket.id).emit("error", { message: `Room ${roomID} doesn't exist` })
    return
  }

  room.users.push(createUser(socket.id))
  usersMap[socket.id] = roomID
  socket.join(roomID)

  // Make sure we're looking at the same doc & page when joining
  // and send userID to client
  const pdfUrl = room.pdfUrl || ""
  io.to(socket.id).emit("sync document", { pdfUrl, userID: socket.id })

  const pageNum = room.pageNum || 1
  io.to(socket.id).emit("sync page", { pageNum })

  io.to(roomID).emit("update users", { users: room.users })
}
