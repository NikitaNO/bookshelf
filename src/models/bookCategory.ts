import Sequelize = require('sequelize')

import { SequelizeAttributes } from '../types'

interface IBookCategory {
  id?: string
  category: string
  description?: string
}

type BookCategoryInstance = Sequelize.Instance<IBookCategory> & IBookCategory

export const bookCategoryFactory = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IBookCategory> = {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    category: {type: Sequelize.STRING, allowNull: false, unique: true},

    description: Sequelize.STRING
  }

  return sequelize.define<BookCategoryInstance, IBookCategory>('BookCategory', attributes, {
    freezeTableName: true,
    timestamps: false
  })
}
