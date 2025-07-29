import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { parse } from './parsers.js'

const getFormat = filepath => path.extname(filepath)

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const data = fs.readFileSync(fullPath).toString()
  return parse(data, getFormat(filepath))
}

const buildTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort()
  const results = keys.map((key) => {
    if (data1[key] === data2[key]) {
      return `    ${key}: ${data1[key]}`
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`
    }
    return [
      `  - ${key}: ${data1[key]}`,
      `  + ${key}: ${data2[key]}`,
    ]
  }).flat()

  return `{\n${results.join('\n')}\n}`
}

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)
  return buildTree(data1, data2)
}

export default genDiff
