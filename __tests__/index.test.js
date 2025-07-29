import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import genDiff from '../src/index.js'

test('json format', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.json`
  const filepath2 = `${__dirname}/../__fixtures__/file2.json`

  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString()
  expect(genDiff(filepath1, filepath2)).toBe(expected)
})

test('yaml format', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.yml`
  const filepath2 = `${__dirname}/../__fixtures__/file2.yml`

  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString()
  expect(genDiff(filepath1, filepath2)).toBe(expected)
})
