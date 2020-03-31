import express, { Application, Request, Response } from "express"
import bodyParser from "body-parser"
import path from "path"

// Middlewares
import useHttps from "./middlewares/useHttps"

// Routes
import uploadRouter from "./routes/upload"

const app: Application = express()

// Enable HMR for dev server
if (process.env.NODE_ENV === "development") {
  // Use require(): we want conditional import
  // because heroku prunes devDependencies and
  // all imports in enableHMR are devDependencies
  require("./utils/enableHMR")(app)
}

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

app.use("/api/upload", uploadRouter)

export default app
