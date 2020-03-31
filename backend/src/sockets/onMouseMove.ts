import { rooms } from "./cache"
import { Connection, SocketData } from "./types"

export default (connection: Connection, data: SocketData): void => {
  const { io, socket } = connection
  const { roomID, mouseX, mouseY } = data

  const room = rooms[roomID]
  if (!room) {
    io.to(socket.id).emit("error", { message: `Room ${roomID} doesn't exist` })
    return
  }

  room.users = room.users.map(user => {
    if (user.id === socket.id) {
      user.mouseX = mouseX
      user.mouseY = mouseY
    }
    return user
  })

  socket.broadcast.to(roomID).emit("update users", { users: room.users })
}