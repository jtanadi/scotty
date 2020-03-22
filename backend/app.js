const bodyParser = require("body-parser")
const express = require("express")
const path = require("path")

const useHttps = require("./middlewares/useHttps")

const app = express()

app.use(bodyParser.json())
app.use(useHttps)
app.use("/static", express.static(path.join(__dirname, "../frontend/static")))
app.use("/", express.static(path.join(__dirname, "../frontend/static")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.use("/api/upload", require("./routes/upload"))

module.exports = app
