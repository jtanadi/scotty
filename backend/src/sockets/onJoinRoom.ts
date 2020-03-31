import { usersMap, rooms } from "./cache"
import {
  Connection,
  JoinRoomData,
  SyncDocData,
  SyncPageData,
  User,
  UsersData,
} from "./types"

const createUser = (id: string): User => {
  return {
    id,
    mouseX: 0,
    mouseY: 0,
  }
}

export default (connection: Connection, data: JoinRoomData): void => {
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

  const syncDocData: SyncDocData = { pdfUrl, userID: socket.id }
  io.to(socket.id).emit("sync document", syncDocData)

  const pageNum = room.pageNum || 1
  const syncPageData: SyncPageData = { pageNum }
  io.to(socket.id).emit("sync page", syncPageData)

  const usersData: UsersData = { users: room.users }
  io.to(roomID).emit("update users", usersData)
}
