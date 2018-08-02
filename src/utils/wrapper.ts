export const wrapper = fn => (req, res, next) => {
  fn(req, res, next).catch(err => {
    if (err.message.includes('foreign key')) {
      const [id] = err.message.match(/\[\d+\]/)
      return next({ httpCode: 400, message: `Entity with provided id not found ${id}` })
    }

    next(err)
  })
}
