const { rooms } = require("./cache")

module.exports = (connection, data) => {
  const { roomID, pdfUrl } = data
  rooms[roomID] = {
    users: [],
    pdfUrl,
    currentPage: 1,
  }
}
