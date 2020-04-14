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
  pages: string[]
}

// Maps roomID to Room
export type RoomsMap = {
  [id: string]: Room
}

// Maps user ID to room ID
export type UsersMap = {
  [userID: string]: string
}

////////////////////////////
// Client -> Server types //
////////////////////////////

export interface RoomData {
  roomID: string
}

export interface CreateRoomData extends RoomData {
  hostID: string
  pdfUrl: string
  pages: string[]
}

export interface ChangePageData extends RoomData {
  pageNum: number
}

export interface MouseMoveData extends RoomData {
  mouseX: number
  mouseY: number
}

////////////////////////////
// Server -> Client types //
////////////////////////////

export type SyncDocData = {
  userID: string
  pdfUrl: string
  pages: string[]
}

export type SyncPageData = {
  pageNum: number
}

export type UsersData = {
  users: User[]
}
