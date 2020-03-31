import s3 from "../utils/s3"
import { rooms, usersMap } from "./cache"

import { Connection, User } from "./types"

export default (connection: Connection): void => {
  const { io, socket } = connection

  const roomID = usersMap[socket.id]
  if (!roomID) return

  const room = rooms[roomID]
  room.users = room.users.filter((user: User) => user.id !== socket.id)

  // When room is empty, delete object from S3 bucket
  // and clear the associated value in our cache
  if (!room.users.length) {
    const { pdfUrl } = rooms[roomID]
    s3.deleteObject(
      { Bucket: process.env.S3_BUCKET, Key: pdfUrl },
      (err, data) => {
        if (err) {
          console.error("ERROR", err)
        } else {
          console.log("DATA", data)
        }
      }
    )

    rooms[roomID] = null
  }

  usersMap[socket.id] = null
  io.to(roomID).emit("update users", { users: room.users })
}
