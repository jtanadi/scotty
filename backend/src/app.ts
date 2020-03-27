import express, { Application } from "express"
import bodyParser from "body-parser"
import path from "path"

import enableHMR from "./utils/enableHMR"

// Middlewares
import useHttps from "./middlewares/useHttps"

// Routes
import uploadRouter from "./routes/upload"

const app: Application = express()

// Enable HMR for dev server
if (process.env.NODE_ENV === "development") {
  enableHMR(app)
}

app.use(useHttps)

app.use(bodyParser.json())

app.use("/", express.static(path.join(__dirname, "../frontend/dist")))
app.use("/static", express.static(path.join(__dirname, "../frontend/static")))

app.get("/", (req, res): void => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.use("/api/upload", uploadRouter)

export default app
