import promise = require('bluebird')
import express = require('express')

const middleware = require('./middleware')
const database = require('./database')

export const startup = async (app): Promise<express.Application> => {
  await promise.each([
    database,
    middleware
  ], func => func(app))

  return app
}
