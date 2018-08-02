import { validationResult } from 'express-validator/check'

export const checkErrors = (req, res, next): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next({ httpCode: 400, message: errors.mapped() })
  next()
}
