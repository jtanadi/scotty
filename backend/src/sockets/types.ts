import { Server, Socket } from "socket.io"

export type Connection = {
  io: Server
  socket: Socket
}

export type ClientData = {
  roomID: string
  pdfUrl?: string
  pageNum?: number
}
