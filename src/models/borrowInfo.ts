import Sequelize = require('sequelize')

import { SequelizeAttributes } from '../types'

interface IBorrowInfo {
  id?: string
  borrowerId: string
  // ownerId: string
  bookId: string
  returnDate: string

  createdAt?: string
  updatedAt?: string
}

export type BorrowInfoInstance = Sequelize.Instance<IBorrowInfo> & IBorrowInfo

export const borrowInforFactory = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IBorrowInfo> = {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    // ownerId: {type: Sequelize.INTEGER, allowNull: false },
    borrowerId: {type: Sequelize.INTEGER, allowNull: false },
    bookId: {type: Sequelize.INTEGER, allowNull: false },
    returnDate: {type: Sequelize.DATE, allowNull: false },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }

  return sequelize.define<BorrowInfoInstance, IBorrowInfo>('BorrowInfo', attributes, {
    freezeTableName: true
  })
}
