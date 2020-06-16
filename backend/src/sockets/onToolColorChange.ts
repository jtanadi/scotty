import { rooms } from "./cache"
import { Connection, ToolColorChangeData } from "./types"

export default (connection: Connection, data: ToolColorChangeData): void => {
  const { socket } = connection
  const { roomID, toolColor } = data
  const room = rooms[roomID]

  // Update only. No need to broadcast/emit
  // because onMouseMove does that
  room.users = room.users.map(user => {
    if (user.id === socket.id) {
      user.toolColor = toolColor
    }
    return user
  })
}
