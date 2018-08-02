import { db } from '../models'

db.sequelize.sync({ force: true })
  .then(() => console.log('successfully droped db'))
  .then(() => process.exit(0))
  .catch(console.log)
