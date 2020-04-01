import io from "socket.io-client"

let socket: SocketIOClient.Socket
if (process.env.NODE_ENV === "production") {
  socket = io()
} else {
  // Default back end port
  const PORT = process.env.PORT || 3030
  socket = io(`http://localhost:${PORT}`)
}

export default socket
