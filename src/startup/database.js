import { db } from '../models'

module.exports = () => {
  db.sequelize.sync()
}
