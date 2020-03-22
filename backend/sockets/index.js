const socket = require("socket.io")

const onChangePage = require("./onChangePage")
const onCreateRoom = require("./onCreateRoom")
const onDisconnect = require("./onDisconnect")
const onJoinRoom = require("./onJoinRoom")

module.exports = server => {
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

    socket.on("disconnect", () => {
      onDisconnect({ io, socket })
    })
  })
}
