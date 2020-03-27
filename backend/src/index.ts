require("dotenv").config()

import server from "./server"
import sockets from "./sockets"

sockets(server)
