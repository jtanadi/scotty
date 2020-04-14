import { Server as HTTPserver } from "http"
import { Server as HTTPSserver } from "https"

import socket, { Server as SocketServer } from "socket.io"

import checkRoom from "./middlewares/checkRoom"

import onChangePage from "./onChangePage"
import onDisconnect from "./onDisconnect"
import onJoinRoom from "./onJoinRoom"
import onMouseMove from "./onMouseMove"

export let io: SocketServer

export default (server: HTTPserver | HTTPSserver): void => {
  io = socket(server)

  io.on("connection", socket => {
    socket.use((packet, next) => checkRoom({ io, socket }, packet, next))

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
