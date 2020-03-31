import { Server as HTTPserver } from "http"
import { Server as HTTPSserver } from "https"

import socket from "socket.io"

import onChangePage from "./onChangePage"
import onCreateRoom from "./onCreateRoom"
import onDisconnect from "./onDisconnect"
import onJoinRoom from "./onJoinRoom"
import onMouseMove from "./onMouseMove"

export default (server: HTTPserver | HTTPSserver): void => {
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

    socket.on("leave room", () => {
      onDisconnect({ io, socket })
    })

    socket.on("disconnect", () => {
      onDisconnect({ io, socket })
    })

    socket.on("mousemove", data => {
      onMouseMove({ io, socket }, data)
    })
  })
}
