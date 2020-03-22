require("dotenv").config()
const socket = require("socket.io")

const server = require("./server")
const s3 = require("./s3")

const io = socket(server)

/*
For temp reference; turn into TS type or interface later
rooms = {
  id: {
    users: number
    pdfUrl: string,
    currentPage: number
  }
}

users = {
  userID: roomID
}
*/

const rooms = {}
const users = {}
io.on("connection", socket => {
  socket.on("create room", data => {
    const { roomID, pdfUrl } = data
    rooms[roomID] = {
      users: [],
      pdfUrl,
      currentPage: 1,
    }
  })

  socket.on("join room", data => {
    const { roomID } = data

    if (!rooms[roomID]) {
      return io
        .to(socket.id)
        .emit("error", { message: `Room ${roomID} doesn't exist` })
    }

    rooms[roomID].users.push(socket.id)
    users[socket.id] = roomID
    socket.join(roomID)

    // Make sure we're looking at the same doc & page when joining
    const pdfUrl = rooms[roomID].pdfUrl || ""
    io.to(socket.id).emit("sync document", { pdfUrl })

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
    if (!roomID) return

    const room = rooms[roomID]
    room.users = room.users.filter(id => id !== socket.id)

    // When room is empty, delete object from S3 bucket
    // and clear the associated value in our cache
    if (!room.users.length) {
      const { pdfUrl } = rooms[roomID]
      s3.deleteObject(
        { Bucket: process.env.S3_BUCKET, Key: pdfUrl },
        (err, data) => {
          if (err) {
            console.error("ERROR", err)
          } else {
            console.log("DATA", data)
          }
        }
      )

      rooms[roomID] = null
    }

    users[socket.id] = null
  })
})
