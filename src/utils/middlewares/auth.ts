import { db } from '../../models'
import { verifyToken } from '../../api/user/user.helpers'

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return next({ httpCode: 401, message: 'token required' })

  const decoded: any = await verifyToken(token)
  const user = await db.User.findById(decoded.id)
  if (!user) return next({ httpCode: 401, message: 'Refresh token please' })

  req.user = user
  next()
}
