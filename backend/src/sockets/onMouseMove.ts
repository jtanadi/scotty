import { rooms } from "./cache"
import { Connection, MouseMoveData, UsersData } from "./types"

export default (connection: Connection, data: MouseMoveData): void => {
  const { socket } = connection
  const { roomID, mouseX, mouseY } = data
  const room = rooms[roomID]

  room.users = room.users.map(user => {
    if (user.id === socket.id) {
      user.mouseX = mouseX
      user.mouseY = mouseY
    }
    return user
  })

  const usersData: UsersData = { users: room.users }
  socket.broadcast.to(roomID).emit("update users", usersData)
}
