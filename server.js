
const dotenv = require('dotenv')
// config
dotenv.config({
  path: './config.env'
})

const mongoose = require('mongoose')

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


  
const PORT = process.env.PORT || 3001
const HOSTNAME = process.env.HOSTNAME || 'localhost'

const app = require('./app.js')
// starting server
app.listen(PORT, HOSTNAME, () => {
  console.log('Server running on http://' + HOSTNAME + ':' + PORT)
})
