import s3 from "../utils/s3"
import { rooms, users } from "./cache"

import { Connection } from "./types"

export default (connection: Connection): void => {
  const { io, socket } = connection

  const roomID = users[socket.id]
  if (!roomID) return

  const room = rooms[roomID]
  room.userIDs = room.userIDs.filter((id: string) => id !== socket.id)

  const participants = room.userIDs

  // When room is empty, delete object from S3 bucket
  // and clear the associated value in our cache
  if (!participants.length) {
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

  users[socket.id] = null
  io.to(roomID).emit("update participants", { participants })
}
