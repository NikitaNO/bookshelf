import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize'
import express = require('express')

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
}
