import io from "socket.io-client"

let socket: SocketIOClient.Socket
if (process.env.NODE_ENV === "production") {
  socket = io()
} else {
  // Default back end port
  socket = io(`http://localhost:3030`)
}

export default socket
