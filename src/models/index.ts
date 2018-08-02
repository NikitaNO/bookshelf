const fs = require('fs')
const path = require('path')
import Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
// eslint-disable-next-line
const config = require('../../config/config.json')[env]

import { userFactory } from './user'
import { bookFactory } from './book'
import { bookCategoryFactory } from './bookCategory'
import { borrowInforFactory } from './borrowInfo'

// const historyFactory = (param: any) => ({})
const sequelize = new Sequelize(config.database, config.username, config.password, config)

export const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  Book: bookFactory(sequelize),
  BookCategory: bookCategoryFactory(sequelize),
  BorrowInfo: borrowInforFactory(sequelize)
}

db.User.hasMany(db.Book, { foreignKey: 'userId' })
db.Book.belongsTo(db.BookCategory, { foreignKey: 'categoryId', as: 'category' })
db.BorrowInfo.belongsTo(db.User, { foreignKey: 'borrowerId' })
db.BorrowInfo.belongsTo(db.Book, { foreignKey: 'bookId' })
