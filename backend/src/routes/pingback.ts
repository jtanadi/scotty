import express, { Request, Response } from "express"
import { rooms } from "../sockets/cache"
import { io } from "../sockets"

import { Room, RoomData } from "../sockets/types"
import initialRoomState from "../utils/initialRoomState"

const router = express.Router()
const s3Url = "https://beam-me-up-scotty.s3.amazonaws.com"

// Send response back and create room
router.post("/", (req: Request, res: Response) => {
  res.sendStatus(204)

  const { status, message, forwardData } = req.body
  const { hostID, roomID, filename } = JSON.parse(forwardData)

  console.log(message)

  if (status === "error") {
    io.to(hostID).emit("conveyor error", message)
  } else if (status === "processing") {
    io.to(hostID).emit("conveyor update", message)
  } else if (status === "end") {
    const { s3Dir, files } = message

    const newRoom: Room = {
      ...initialRoomState,
      filename,
      s3Dir,
      pdfUrl: `${s3Url}/${s3Dir}`,
      pages: files,
    }

    rooms[roomID] = newRoom

    // Send private message back to room creator with roomID
    const roomCreatedData: RoomData = { roomID }
    io.to(hostID).emit("room created", roomCreatedData)
  }
})

export default router
