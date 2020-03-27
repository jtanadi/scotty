import io from "socket.io-client"
const socket = io()

export type SocketData = {
  roomID: string
  pdfUrl?: string
  pageNum?: number
}

export default socket
