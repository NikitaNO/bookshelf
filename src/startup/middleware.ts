import morgan = require('morgan')
import bodyParser = require('body-parser')

const router = require('../api/router')

module.exports = app => {
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use('/api', router)

  app.use((err, req, res, next) => {
    const code = err.httpCode || 500
    console.log(process.env.NODE_ENV === 'production' ? err.message : err)
    res.status(code).json({ message: err.message })
  })
}
