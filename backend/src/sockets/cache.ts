type Room = {
  userIDs: Array<string>
  pdfUrl: string
  pageNum: number
}

type Rooms = {
  [id: string]: Room
}

// Maps user ID to room ID
type Users = {
  [userID: string]: string
}

export const rooms: Rooms = {}
export const users: Users = {}
