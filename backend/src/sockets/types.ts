import { Server, Socket } from "socket.io"

export type Connection = {
  io: Server
  socket: Socket
}

export type User = {
  id: string
  mouseX: number
  mouseY: number
  toolColor: string
}
export type Room = {
  users: User[]
  filename: string
  s3Dir: string
  pdfUrl: string
  pageNum: number
  pages: string[]
  presenterID: string
  zoom: number
  scrollLeft: number
  scrollTop: number
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

export interface JoinRoomData extends RoomData {
  toolColor: string
}

export interface CreateRoomData extends RoomData {
  hostID: string
  s3Dir: string
  pages: string[]
}

export interface ChangePageData extends RoomData {
  pageNum: number
}

export interface MouseMoveData extends RoomData {
  mouseX: number
  mouseY: number
}

export interface ToolColorChangeData extends RoomData {
  toolColor: string
}

export interface ChangeScrollData extends RoomData {
  scrollLeft: number
  scrollTop: number
}

export interface ChangeZoomData extends RoomData {
  zoom: number
}

////////////////////////////
// Server -> Client types //
////////////////////////////

export type SyncDocData = {
  userID: string
  pdfUrl: string
  pages: string[]
  filename: string
  presenterID: string
  zoom: number
  scrollLeft: number
  scrollTop: number
}

export type SyncPageData = {
  pageNum: number
}

export type UsersData = {
  users: User[]
}

export type PresenterData = {
  presenterID: string
}

export type SyncScrollData = {
  scrollLeft: number
  scrollTop: number
}

export type SyncZoomData = {
  zoom: number
}
