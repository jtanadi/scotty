const { rooms } = require("./cache")

module.exports = (connection, data) => {
  const { io } = connection
  const { roomID, pageNum } = data

  rooms[roomID].pageNum = pageNum
  io.to(roomID).emit("sync page", data)
}
