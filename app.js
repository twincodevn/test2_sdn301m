const express = require('express')
const morgan = require('morgan')
const app = express()
const userRoute = require('./routes/userRoutes.js')
const tourRoute = require('./routes/tourRoutes.js')

// middleware
app.use(express.json())
if (process.env.NODE_ENV == 'devlopment') {
  app.use(morgan('dev'))
}
app.use(express.static(`${__dirname}/public`))
// routing
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)

module.exports = app
