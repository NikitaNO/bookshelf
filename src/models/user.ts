import bcrypt = require('bcrypt')
import Sequelize = require('sequelize')

import { SequelizeAttributes } from '../types'

interface IUser {
  id?: string
  email: string
  username: string
  address: boolean
  password: string
  telephone: string
  website?: string
}

export type UserInstance = Sequelize.Instance<IUser> & IUser

export const userFactory = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IUser> = {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: Sequelize.STRING, unique: true, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    username: {type: Sequelize.STRING, allowNull: false},
    address: {type: Sequelize.STRING, allowNull: false},
    telephone: {type: Sequelize.STRING, allowNull: false},
    website: {type: Sequelize.STRING}
  }

  const User = sequelize.define<UserInstance, IUser>('User', attributes, {
    freezeTableName: true,

    hooks: {
      beforeCreate: async (user: IUser): Promise<void> => {
        user.password = await bcrypt.hash(user.password, 10)
      }
    },

    indexes: [{ unique: true, fields: ['email'] }]
  })

  return User
}
