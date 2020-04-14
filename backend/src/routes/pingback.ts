import express, { Request, Response } from "express"
import { rooms } from "../sockets/cache"
import { io } from "../sockets"

import { Room, RoomData } from "../sockets/types"

const router = express.Router()
const s3Url = "https://beam-me-up-scotty.s3.amazonaws.com"

// Send response back and create room
router.post("/", (req: Request, res: Response) => {
  res.sendStatus(204)

  const { s3Dir, files, forwardData } = req.body
  const { hostID, roomID } = JSON.parse(forwardData)

  const newRoom: Room = {
    users: [],
    s3Dir,
    pdfUrl: `${s3Url}/${s3Dir}`,
    pageNum: 1,
    pages: files,
  }

  rooms[roomID] = newRoom

  // Send private message back to room creator with roomID
  const roomCreatedData: RoomData = { roomID }
  io.to(hostID).emit("room created", roomCreatedData)
})

export default router
