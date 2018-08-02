import express = require('express')
import { startup } from './startup'

const application = express()

startup(application).then((app: express.Application) => {
  app.listen(3000, () => console.log('Server start on port 3000'))
})
