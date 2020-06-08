import { rooms } from "./cache"
import { Connection, PointerChangeData } from "./types"

export default (connection: Connection, data: PointerChangeData): void => {
  const { socket } = connection
  const { roomID, color } = data
  const room = rooms[roomID]

  room.users = room.users.map(user => {
    if (user.id === socket.id) {
      user.pointerColor = color
    }
    return user
  })
}
