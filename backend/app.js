const bodyParser = require("body-parser")
const express = require("express")
const path = require("path")

const app = express()

app.use(bodyParser.json())
app.use("/static", express.static(path.join(__dirname, "../frontend/static")))
app.use("/", express.static(path.join(__dirname, "../frontend/static")))

app.get("/", (req, res) => {
  if (req.hostname !== "localhost" && req.protocol === "http") {
    res.redirect(`https://${req.get("host")}${req.url}`)
  }

  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.use("/api/upload", require("./routes/upload"))

module.exports = app
