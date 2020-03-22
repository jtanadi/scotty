require("dotenv").config()

const server = require("./server")
require("./sockets")(server)
