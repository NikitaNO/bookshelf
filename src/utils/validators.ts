export const checkId = (value: string) => {
  const validId = /^\d{18}$/

  if (typeof value !== 'string' || !value.match(validId)) {
    throw new Error('Wrong id format')
  }

  return Promise.resolve()
}
