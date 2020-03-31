import { Server, Socket } from "socket.io"

export type Connection = {
  io: Server
  socket: Socket
}

export type User = {
  id: string
  mouseX: number
  mouseY: number
}

export type Room = {
  users: User[]
  pdfUrl: string
  pageNum: number
}

export type Rooms = {
  [id: string]: Room
}

// Maps user ID to room ID
export type UsersMap = {
  [userID: string]: string
}

export type SocketData = {
  roomID: string
  userID?: string
  pdfUrl?: string
  pageNum?: number
  users?: User[]
  mouseX?: number
  mouseY?: number
}
