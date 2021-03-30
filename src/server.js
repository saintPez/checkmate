const { config } = require('dotenv')
config({ path: `.env.${process.env.NODE_ENV}` })

const app = require('./app')
const { sequelize } = require('./database')
const { Server } = require('socket.io')

const { PORT } = require('./env')

// Server

const server = app.listen(PORT, async () => {
  console.log(`> Server running on port ${PORT}`)
})

// Database

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('> Datbase connected')
  })
  .catch((error) => {
    console.log(error)
  })

// Socket

const io = new Server(server)

const messages = []

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    messages.push(message)
    socket.broadcast.emit('message', message)
  })
})
