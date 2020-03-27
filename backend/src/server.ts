import { Server as HTTPserver } from "http"
import https, { Server as HTTPSserver } from "https"

import app from "./app"

const PORT = process.env.PORT || 3000

let server: HTTPserver | HTTPSserver
if (process.env.NOD_ENV === "production") {
  server = https.createServer(app).listen(PORT)
} else {
  server = app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
}
export default server
