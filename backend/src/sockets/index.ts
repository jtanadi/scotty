import { Server } from "http"
import socket from "socket.io"

import onChangePage from "./onChangePage"
import onCreateRoom from "./onCreateRoom"
import onDisconnect from "./onDisconnect"
import onJoinRoom from "./onJoinRoom"

export default (server: Server): void => {
  const io = socket(server)

  io.on("connection", socket => {
    socket.on("create room", data => {
      onCreateRoom({ io, socket }, data)
    })

    socket.on("join room", data => {
      onJoinRoom({ io, socket }, data)
    })

    socket.on("client change page", data => {
      onChangePage({ io, socket }, data)
    })

    socket.on("client close", () => {
      onDisconnect({ io, socket })
    })

    socket.on("disconnect", () => {
      onDisconnect({ io, socket })
    })
  })
}
