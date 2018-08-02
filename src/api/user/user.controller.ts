import { body } from 'express-validator/check'
import bcrypt = require('bcrypt')
import { pick } from 'lodash'

import { db } from '../../models'
import { wrapper } from '../../utils/wrapper'
import { checkErrors } from '../../utils/middlewares/checkErrors'
import { generateToken } from './user.helpers'

export const register = [
  body('username').isString().exists(),
  body('email').isString().isEmail().exists(),
  body('password').isString().exists(),
  body('address').isString().exists(),
  body('telephone').isString().exists(),
  body('website').isString().isURL().optional({ checkFalsy: true }),
  checkErrors,

  async (req, res, next) => {
    try {
      const data = pick(req.body, ['username', 'email', 'password', 'name', 'address', 'telephone', 'website'])
      const user = db.User.build(data)
      await user.save()

      const token = await generateToken({ id: user.id })
      res.json({ token })
    } catch (err) {
      if (err.message.includes('duplicate')) {
        return next({ httpCode: 400, message: 'This email is already exists' })
      }

      // TODO: unique email
      next(err)
    }
  }
]

export const login = [
  body('email').isEmail().exists(),
  body('password').isString().exists(),
  checkErrors,

  wrapper(async (req, res, next) => {
    const user = await db.User.findOne({ where: { email: req.body.email } })
    if (!user) return next({ httpCode: 401, message: 'Wrong email or password' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return next({ httpCode: 401, message: 'Wrong email or password' })

    const token = await generateToken({ id: user.id })
    res.json({ token })
  })
]
