import { Router } from 'express'

const router = Router()

router.use('/users', require('../api/user/user.router'))
router.use('/books', require('../api/book/book.router'))

module.exports = router
