import { Server, Socket } from "socket.io"

export type Connection = {
  io: Server
  socket: Socket
}

export type SocketData = {
  roomID: string
  pdfUrl?: string
  pageNum?: number
}

