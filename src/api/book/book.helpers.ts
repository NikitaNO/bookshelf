import moment = require('moment')

export const borrowedBooksQuery = (userId: string, orderBy?: string): string => {
  let query = `
SELECT "Book"."id" AS "id", "userId", "title", "author", "year", "Book"."description", "category" FROM "Book"
JOIN "BookCategory" ON "Book"."categoryId" = "BookCategory"."id"
WHERE "Book"."id" IN (
  SELECT "BorrowInfo"."bookId" FROM "BorrowInfo"
  JOIN "Book" AS "book" ON "book"."id" = "BorrowInfo"."bookId"
  WHERE "book"."userId" = ${userId} AND "returnDate" > '${moment().toISOString()}'
)
`
  if (orderBy) {
    query = query + ` ORDER BY ${orderBy}`
  }

  return query
}
