import express, { Request, Response } from "express"
import io from "socket.io-client"

import { CreateRoomData } from "../sockets/types"

const router = express.Router()

let socket: SocketIOClient.Socket
if (process.env.NODE_ENV === "production") {
  socket = io()
} else {
  // Default back end port
  socket = io(`http://localhost:3030`)
}

const s3Url = "https://beam-me-up-scotty.s3.amazonaws.com"

router.post("/", (req: Request, res: Response) => {
  res.sendStatus(204)

  const { s3Dir, files, forwardData } = req.body
  const { hostID, roomID } = JSON.parse(forwardData)

  const createRoomData: CreateRoomData = {
    hostID,
    roomID,
    pdfUrl: `${s3Url}/${s3Dir}`,
    pages: files,
  }

  socket.emit("create room", createRoomData)
})

export default router
