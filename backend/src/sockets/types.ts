import { Server, Socket } from "socket.io"

export type Connection = {
  io: Server
  socket: Socket
}

