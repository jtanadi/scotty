import express, { Application, Request, Response } from "express"
import bodyParser from "body-parser"
import path from "path"

// Middlewares
import useHttps from "./middlewares/useHttps"
import useGzip from "./middlewares/useGzip"

// Routes
import uploadRouter from "./routes/upload"
import pingbackRouter from "./routes/pingback"

const app: Application = express()

app.use(useHttps)
app.use(bodyParser.json())

app.use("/", express.static(path.join(__dirname, "../../frontend/dist")))
app.use(
  "/static",
  express.static(path.join(__dirname, "../../frontend/static"))
)

app.get("/", (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"))
})
app.get("*.js", useGzip)

app.use("/api/upload", uploadRouter)
app.use("/api/pingback", pingbackRouter)

export default app
