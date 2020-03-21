const socket = require("socket.io")

const server = require("./server")

const io = socket(server)

/*
rooms: {
  id: {
    users: number
    pdfUrl: string,
    currentPage: number
  }
}
*/

/*
users = {
  userID: roomID
}
*/
const rooms = {}
const users = {}
io.on("connection", socket => {
  // socket.on("create room", data => {})

  socket.on("join room", data => {
    const { roomID } = data

    if (!rooms[roomID]) {
      rooms[roomID] = { users: [socket.id], pdfUrl: "" }
    } else {
      rooms[roomID].users.push(socket.id)
    }

    users[socket.id] = roomID
    socket.join(roomID)

    // make sure we're on the same page when joining
    const pageNum = rooms[roomID].pageNum || 1
    io.to(socket.id).emit("sync page", { pageNum })
  })

  socket.on("client change page", data => {
    const { roomID, pageNum } = data
    rooms[roomID].pageNum = pageNum
    io.to(roomID).emit("sync page", data)
  })

  socket.on("disconnect", () => {
    const roomID = users[socket.id]
    if (roomID) {
      const room = rooms[roomID]
      room.users = room.users.filter(id => id !== socket.id)

      if (!room.users.length) {
        rooms[roomID] = null
      }

      users[socket.id] = null
    }
  })
})
