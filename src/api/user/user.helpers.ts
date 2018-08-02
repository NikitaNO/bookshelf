import jwt = require('jsonwebtoken')
import config = require('config')

export const generateToken = data => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, config.get('jwtSecret'), (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}
