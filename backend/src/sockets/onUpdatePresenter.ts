import { rooms } from "./cache"
import { Connection, RoomData, PresenterData } from "./types"

export default (connection: Connection, data: RoomData): void => {
  const { socket, io } = connection
  const { roomID } = data

  const room = rooms[roomID]

  // If the client sending message is the same as current presenter,
  // toggle presenter off; otherwise set that client as presenter
  let presenterData: PresenterData
  if (room.presenterID && room.presenterID === socket.id) {
    room.presenterID = ""
    presenterData = { presenterID: "" }
  } else {
    room.presenterID = socket.id
    presenterData = { presenterID: socket.id }
  }

  io.to(roomID).emit("update presenter", presenterData)
}
