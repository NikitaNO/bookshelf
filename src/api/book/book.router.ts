import { Router } from 'express'

import * as controller from './book.controller'
import { requireAuth } from '../../utils/middlewares/auth'

const router = Router()

router.post('/', requireAuth, controller.addBook)
router.post('/borrow', requireAuth, controller.borrowBook)

router.get('/', requireAuth, controller.getAllbooks)
router.get('/categories', requireAuth, controller.getBookCategories)
router.get('/borrowed', requireAuth, controller.getBorrowedBooks)
router.get('/:id', requireAuth, controller.getBookById)

router.delete('/:id', requireAuth, controller.deleteBook)

router.patch('/:id', requireAuth, controller.editBook)

module.exports = router
