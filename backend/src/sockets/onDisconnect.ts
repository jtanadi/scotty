import s3 from "../utils/s3"
import { rooms, usersMap } from "./cache"

import { Connection, User, UsersData } from "./types"

export default (connection: Connection): void => {
  const { io, socket } = connection

  const roomID = usersMap[socket.id]
  if (!roomID) return

  const room = rooms[roomID]
  if (!room) return

  room.users = room.users.filter((user: User) => user.id !== socket.id)

  // When room is empty, delete object from S3 bucket
  // and clear the associated value in our cache
  if (!room.users.length) {
    const { pdfUrl, pages } = rooms[roomID]

    const params = {
      Bucket: process.env.S3_BUCKET,
      Delete: {
        Objects: pages.map(page => ({ Key: `${pdfUrl}/${page}` })),
      },
    }

    s3.deleteObjects(params, (err, data) => {
      if (err) {
        console.error("ERROR", err)
      } else {
        console.log("DATA", data)
      }
    })

    rooms[roomID] = null
  }

  usersMap[socket.id] = null

  const usersData: UsersData = { users: room.users }
  io.to(roomID).emit("update users", usersData)
}
