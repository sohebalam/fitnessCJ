const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")
const dotenv = require("dotenv")
const PORT = process.env.PORT || 8000

const app = express()
const server = http.Server(app)
const io = socketio(server)

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

try {
  mongoose.connect(
    "mongodb+srv://soheb1234:soheb1234@cluster0.lb1qj.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  console.log("MongoDb connected successfully!")
} catch (error) {
  console.log(error)
}

const connectUsers = {}

io.on("connection", (socket) => {
  //   const { user } = socket.handshake.query

  //   connectUsers[user] = socket.id
  console.log("user is connected", socket.id)
})

//app.use()
app.use((req, res, next) => {
  req.io = io
  req.connectUsers = connectUsers
  return next()
})
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))

app.use(routes)

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
