import Sequelize = require('sequelize')

import { SequelizeAttributes } from '../types'

interface IBook {
  id?: string
  userId: string
  title: string
  author: string
  year: string
  description: string
  categoryId: string

  createdAt?: string
  updatedAt?: string
}

export type BookInstance = Sequelize.Instance<IBook> & IBook

export const bookFactory = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IBook> = {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: Sequelize.INTEGER, allowNull: false },
    title: { type: Sequelize.STRING, allowNull: false },
    author: { type: Sequelize.STRING, allowNull: false },
    year: { type: Sequelize.INTEGER, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    categoryId: { type: Sequelize.INTEGER, allowNull: false },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }

  return sequelize.define<BookInstance, IBook>('Book', attributes, {
    freezeTableName: true
  })
}
