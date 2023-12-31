const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('crglog')
const cors = require('cors')

const indexRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

indexRouter(app)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
