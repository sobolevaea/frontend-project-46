import fs from 'fs'
import path from 'path'
import { parse } from './parsers.js'
import buildTree from './buildtree.js'
import format from './formatters/index.js'

const getFormat = filepath => path.extname(filepath)

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const data = fs.readFileSync(fullPath).toString()
  return parse(data, getFormat(filepath))
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  const tree = buildTree(data1, data2)
  return format(tree, formatName)
}

export default genDiff
