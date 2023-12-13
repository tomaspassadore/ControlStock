require("dotenv").config()
const log = require("./lib/log")
const server = require("./server")
const PORT = process.env.PORT || 3001
const { Connection } = require('./models/db')
const init = async () => {
  try {
    log.info("App", "Starting App...")
    log.info("App", `Process ID ${process.pid}`)
    await Connection.open(process.env.MONGODB_URL, process.env.MONGODB_DB)
    server.start(PORT)
  } catch (error) {
    console.log(error)
  }
}

init()