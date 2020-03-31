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

// Maps roomID to Room
export type RoomsMap = {
  [id: string]: Room
}

// Maps user ID to room ID
export type UsersMap = {
  [userID: string]: string
}

///////////////////////////
// Client -> Server types//
///////////////////////////

export type JoinRoomData = {
  roomID: string
}

export type CreateRoomData = {
  roomID: string
  pdfUrl: string
}
export type ChangePageData = {
  roomID: string
  pageNum: number
}

export type MouseMoveData = {
  roomID: string
  mouseX: number
  mouseY: number
}

///////////////////////////
// Server -> Client types//
///////////////////////////

export type SyncDocData = {
  pdfUrl: string
  userID: string
}

export type SyncPageData = {
  pageNum: number
}

export type UsersData = {
  users: User[]
}
