import { Server as HTTPserver } from "http"
import { Server as HTTPSserver } from "https"

import socket, { Server as SocketServer } from "socket.io"

import checkRoom from "./middlewares/checkRoom"
import { Connection } from "./types"

import onChangePage from "./onChangePage"
import onDisconnect from "./onDisconnect"
import onJoinRoom from "./onJoinRoom"
import onMouseMove from "./onMouseMove"
import onToolColorChange from "./onToolColorChange"
import onUpdatePresenter from "./onUpdatePresenter"
import onUpdateScroll from "./onUpdateScroll"
import onUpdateZoom from "./onUpdateZoom"

export let io: SocketServer

export default (server: HTTPserver | HTTPSserver): void => {
  io = socket(server, { cookie: false })

  io.on("connection", socket => {
    const connection: Connection = {
      io,
      socket,
    }

    socket.use((packet, next) => checkRoom(connection, packet, next))

    socket.on("join room", data => {
      onJoinRoom(connection, data)
    })

    socket.on("client change page", data => {
      onChangePage(connection, data)
    })

    socket.on("leave room", () => {
      onDisconnect(connection)
    })

    socket.on("disconnect", () => {
      onDisconnect(connection)
    })

    socket.on("mousemove", data => {
      onMouseMove(connection, data)
    })

    socket.on("change tool color", data => {
      onToolColorChange(connection, data)
    })

    socket.on("client update presenter", data => {
      onUpdatePresenter(connection, data)
    })

    socket.on("client update scroll", data => {
      onUpdateScroll(connection, data)
    })

    socket.on("client update zoom", data => {
      onUpdateZoom(connection, data)
    })
  })
}
