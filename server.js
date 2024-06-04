const dotenv = require('dotenv')
const mongoose = require('mongoose')

// config
dotenv.config({
  path: './config.env'
})

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection successfully')
  })

const PORT = process.env.PORT || 1999
const HOSTNAME = process.env.HOSTNAME || 'localhost'

const app = require('./app.js')
// starting server
server = app.listen(PORT, HOSTNAME, () => {
  console.log('Server running on http://' + HOSTNAME + ':' + PORT)
})

process.on('unhandledRejection', err => {
  console.log('unhandle rejection')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', err => {
  console.log('Uncaught expection')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
