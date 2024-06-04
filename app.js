const express = require('express')
const morgan = require('morgan')
const app = express()
const genreRoute = require('./routes/genreRoutes.js')
const bookRoute = require('./routes/bookRoutes.js')
const AppError = require('./utils/appError.js')
const errorController = require('./controllers/errorController.js')
// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()

  next()
})
// routing
app.use('/books', bookRoute)
app.use('/genres',genreRoute)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})
app.use(errorController.globalErrorHandler)
module.exports = app
