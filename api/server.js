require("dotenv").config()
const express = require('express')
const cors = require('cors')
const routes = require("./routes")
const app = express()
app.use(express.json())

const URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({
  origin: URL,
  credentials: true
}))
const start = (port) => {
  app.use("/api", routes)
  app.listen(port, () => { console.log(`Server listening on port ${port}`) })
  return { app }
}

module.exports = Object.assign({}, { start })