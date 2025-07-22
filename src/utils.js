import _ from 'lodash'
import { readFileSync } from 'node:fs'

export const parse = (filepath) => {
  const file = readFileSync(filepath, 'utf8')
  return JSON.parse(file)
}

export const genDiff = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort()
  const results = keys.map((key) => {
    if (file1[key] === file2[key]) {
      return `    ${key}: ${file1[key]}`
    }
    if (!_.has(file2, key)) {
      return `  - ${key}: ${file1[key]}`
    }
    if (!_.has(file1, key)) {
      return `  + ${key}: ${file2[key]}`
    }
    return [
      `  - ${key}: ${file1[key]}`,
      `  + ${key}: ${file2[key]}`,
    ]
  }).flat()

  return `{\n${results.join('\n')}\n}`
}
