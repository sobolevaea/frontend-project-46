import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { parse } from './parsers.js'
import { formatStylish } from './stylish.js'

const getFormat = filepath => path.extname(filepath)

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const data = fs.readFileSync(fullPath).toString()
  return parse(data, getFormat(filepath))
}

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value1: data2[key],
      }
    }
    if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value1: data1[key],
      }
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildTree(data1[key], data2[key]),
      }
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        value1: data1[key],
        value2: data2[key],
      }
    }
    return {
      type: 'unchanged',
      key,
      value1: data1[key],
    }
  })
}

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  const tree = buildTree(data1, data2)
  return formatStylish(tree)
}

export default genDiff
