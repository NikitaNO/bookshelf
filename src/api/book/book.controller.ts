import { body, param, query } from 'express-validator/check'
import bcrypt = require('bcrypt')
import { pick } from 'lodash'
import moment = require('moment')

import { db } from '../../models'
import { wrapper } from '../../utils/wrapper'
import { checkErrors } from '../../utils/middlewares/checkErrors'
import { checkId } from '../../utils/validators'
import { borrowedBooksQuery } from './book.helpers'

const Op = db.sequelize.Op

export const addBook = [
  body('title').isString().exists(),
  body('author').isString().exists(),
  body('description').isString().exists(),
  body('year').exists().matches(/\d{4}/).toInt(),
  body('categoryId').isString().exists().custom(checkId),
  checkErrors,

  wrapper(async (req, res, next) => {
    await db.Book.create({ ...req.body, userId: req.user.id }, {
      fields: ['title', 'author', 'description', 'year', 'categoryId', 'userId']
    })

    res.sendStatus(204)
  })
]

export const getAllbooks = wrapper(async (req, res, next) => {
  const books = await db.Book.findAll({
    where: { userId: req.user.id },
    include: [{ model: db.BookCategory, as: 'category' }]
  })
  res.json({ books })
})

export const editBook = [
  param('id').custom(checkId),
  body('title').isString().optional(),
  body('author').isString().optional(),
  body('description').isString().optional(),
  body('year').optional().matches(/\d{4}/).toInt(),
  body('categoryId').isString().optional().custom(checkId),
  checkErrors,

  wrapper(async (req, res, next) => {
    const data = pick(req.body, ['title', 'author', 'description', 'year', 'categoryId'])
    const [result] = await db.Book.update(data, {
      where: { id: req.params.id, userId: req.user.id }
    })

    if (!result) return next({ httpCode: 400, message: 'Unable to update book' })
    res.sendStatus(204)
  })
]

export const deleteBook = [
  param('id').custom(checkId),
  checkErrors,

  wrapper(async (req, res, next) => {
    const result = await db.Book.destroy({ where: { id: req.params.id, userId: req.user.id } })
    if (!result) return next({ httpCode: 400, message: 'Unable to delete book' })

    res.sendStatus(200)
  })
]

export const getBookById = [
  param('id').custom(checkId),
  checkErrors,

  wrapper(async (req, res, next) => {
    const book = await db.Book.findById(req.params.id, {
      include: [{ model: db.BookCategory, as: 'category' }]
    })

    if (!book) return next({ httpCode: 404, message: 'Unable to find book' })

    res.json({ book })
  })
]

export const borrowBook = [
  body('bookId').exists().custom(checkId),
  body('returnDate').exists().custom(value => {
    if (!moment(value, 'YYYY-MM-DD').isValid()) throw {httCode: 400, message: 'Wrong returnDate format'}
    return Promise.resolve()
  }),
  checkErrors,

  wrapper(async (req, res, next) => {
    const inUse = await db.BorrowInfo.findOne({
      where: {
        bookId: req.body.bookId,
        returnDate: { [Op.gt]: moment().toISOString() }
      }
    })

    if (inUse) return next({ httpCode: 400, message: 'This book is already borrowed' })

    await db.BorrowInfo.create({
      borrowerId: req.user.id,
      bookId: req.body.bookId,
      returnDate: moment(req.body.returnDate, 'YYYY-MM-DD').toISOString()
    })

    res.sendStatus(204)
  })

]

export const getBorrowedBooks = [
  query('orderBy').isString().isIn(['category', 'author']).optional(),

  wrapper(async (req, res, next) => {
    const books = await db.sequelize.query(
      borrowedBooksQuery(req.user.id, req.query.orderBy),
      { type: db.sequelize.QueryTypes.SELECT }
    )

    res.json({ books })
  })
]

export const getBookCategories = wrapper(async (req, res, next) => {
  const categories = await db.BookCategory.findAll({})
  res.json({ categories })
})
